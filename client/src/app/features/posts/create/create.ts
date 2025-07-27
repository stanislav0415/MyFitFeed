import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'create',
  standalone: true, 
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './create.html',
})
export class Create {
  postForm: FormGroup;
  imageFile: File | null = null;
  imageError: string = '';
  serverErrorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Please upload a valid image file.';
        this.imageFile = null;
      } else {
        this.imageError = '';
        this.imageFile = file;
      }
    }
  }

  onSubmit() {
    if (this.postForm.invalid || !this.imageFile) {
      if (!this.imageFile) {
        this.imageError = 'Image is required.';
      }
      return;
    }

    const formData = new FormData();
    formData.append('title', this.postForm.value.title);
    formData.append('description', this.postForm.value.description);
    formData.append('image', this.imageFile);

    console.log('Submitting post', formData);
  }
}
