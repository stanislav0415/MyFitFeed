import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostFormService } from '../forms/create.form';
import { PostService } from '../../../core/services/post.service'; 

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  private postFormService = inject(PostFormService);
  private postService = inject(PostService);
  private router = inject(Router);

  postForm = this.postFormService.createForm();
  serverErrorMessage: string | null = null;

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
    if (this.postFormService.isFormValid(this.postForm)) {
      const postData = this.postFormService.getFormValue(this.postForm);
      this.postService.createPost(postData)
      .subscribe({
        next: () => this.router.navigate(['/home']),
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
