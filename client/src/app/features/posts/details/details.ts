import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../models';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  post: Post | null = null;
  isOwner = false;
  isLiked = false;
  loading = true;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe({
        next: (res) => {
          console.log('Post details:', res.isOwner, res.isLiked);
          this.post = res.post;
          this.isOwner = res.isOwner;
          this.isLiked = res.isLiked;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load post:', err);
          this.loading = false;
        }
      });
    }
  }
}
