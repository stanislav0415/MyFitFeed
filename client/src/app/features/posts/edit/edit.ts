import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostFormService } from '../forms/create.form';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css'],
})
export class Edit implements OnInit {
  private postFormService = inject(PostFormService);
  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  postForm = this.postFormService.createForm();
  serverErrorMessage: string | null = null;
  postId: string | null = null;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe({
        next: (post) => {
          this.postForm.patchValue({
            title: post.post.title,
            description: post.post.description,
            imageUrl: post.post.imageUrl || '',
          });
        },
        error: () => {
          this.serverErrorMessage = 'Failed to load post data.';
        },
      });
    }
  }

  get title() {
    return this.postFormService.getTitleControl(this.postForm);
  }

  get description() {
    return this.postFormService.getDescriptionControl(this.postForm);
  }

  get imageUrl() {
    return this.postFormService.getImageUrlControl(this.postForm);
  }

  get isTitleError() {
    return this.postFormService.isTitleError(this.postForm);
  }

  get isDescriptionError() {
    return this.postFormService.isDescriptionError(this.postForm);
  }

  get isImageUrlError() {
    return this.postFormService.isImageUrlError(this.postForm);
  }

  get titleErrorMessage() {
    return this.postFormService.getTitleErrorMessage(this.postForm);
  }

  get descriptionErrorMessage() {
    return this.postFormService.getDescriptionErrorMessage(this.postForm);
  }

  get imageUrlErrorMessage() {
    return this.postFormService.getImageUrlErrorMessage(this.postForm);
  }

  onSubmit(): void {
    if (this.postFormService.isFormValid(this.postForm) && this.postId) {
      const postData = this.postFormService.getFormValue(this.postForm);

      this.postService.updatePost(this.postId, postData).subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (err) => {
          this.serverErrorMessage = err?.error?.message || 'Something went wrong. Please try again.';
          this.postFormService.markFormTouched(this.postForm);
        },
      });
    } else {
      this.postFormService.markFormTouched(this.postForm);
    }
  }
}
