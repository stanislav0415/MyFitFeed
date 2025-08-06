import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models';
import { PostService } from '../../../core/services/post.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import {Comment} from '../comment/comment'; 
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Comment],
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class Details {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn();

  post: Post | null = null;
  isOwner = false;
  isLiked = false;
  loading = true;

  showComments = false;
  newComment = '';
  editedComment: { _id: string; comment: string } | null = null;

  currentUser = this.authService.currentUser();

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe({
        next: (res) => {
          this.post = res.post;
          this.isOwner = res.isOwner;
          this.isLiked = res.isLiked;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load post:', err);
          this.loading = false;
        },
      });
    }
  }

  toggleLike(): void {
    if (!this.post) return;

    const currentUserId = this.currentUser?._id;
    if (!currentUserId) {
      console.error('Invalid user ID.');
      return;
    }

    if (this.isLiked) {
      this.post.likes = this.post.likes?.filter((id) => id !== currentUserId) || [];
      this.isLiked = false;
    } else {
      this.post.likes = [...(this.post.likes || []), currentUserId];
      this.isLiked = true;
    }

    this.postService.toggleLike(this.post.id!).subscribe({
      next: () => {},
      error: (err) => console.error('Error toggling like:', err),
    });
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  addComment(): void {
    if (!this.post || !this.newComment.trim()) return;

    const user = this.currentUser;
    if (!user || !user._id) {
      console.error('Invalid user.');
      return;
    }

   
    this.postService.addComment(this.post.id!, this.newComment.trim()).subscribe({
      next: (updatedPost) => {
        this.post!.comments = updatedPost.comments;
        this.newComment = '';
      },
      error: (err) => console.error('Error adding comment:', err),
    });
  }
  onNewCommentChange(value: string): void {
  this.newComment = value;
}

  startEdit(comment: { _id: string; comment: string }): void {
    this.editedComment = { ...comment };
  }

  cancelEdit(): void {
    this.editedComment = null;
  }

  saveEditedComment(): void {
    if (!this.editedComment || !this.editedComment.comment.trim()) return;

    this.postService.updateComment(this.post!.id!, this.editedComment._id, this.editedComment.comment.trim()).subscribe({
      next: (updatedComment) => {
        if (!this.post?.comments) return;
        updatedComment.user = this.currentUser; 
        const index = this.post.comments.findIndex((c) => c._id === updatedComment._id);
        if (index !== -1) {
          this.post.comments[index] = updatedComment;
        }
        this.editedComment = null;
      },
      error: (err) => console.error('Error updating comment:', err),
    });
  }

  deleteComment(commentId: string): void {
    if (!this.post) return;

    if (confirm('Are you sure you want to delete this comment?')) {
      this.postService.deleteComment(this.post.id!, commentId).subscribe({
        next: () => {
          this.post!.comments = this.post!.comments!.filter((c) => c._id !== commentId);
        },
        error: (err) => console.error('Error deleting comment:', err),
      });
    }
  }

  deletePost(): void {
    if (!this.post) return;

    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.post.id!).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error deleting post:', err),
      });
    }
  }
}
