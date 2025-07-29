import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  private formBuilder = inject(FormBuilder);

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: ['', [Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/)]], 
    });
  }


  getTitleControl(form: FormGroup) {
    return form.get('title');
  }

  getDescriptionControl(form: FormGroup) {
    return form.get('description');
  }

  getImageUrlControl(form: FormGroup) {
    return form.get('imageUrl');
  }


  isTitleError(form: FormGroup): boolean {
    const control = this.getTitleControl(form);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  isDescriptionError(form: FormGroup): boolean {
    const control = this.getDescriptionControl(form);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  isImageUrlError(form: FormGroup): boolean {
    const control = this.getImageUrlControl(form);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  getTitleErrorMessage(form: FormGroup): string {
    const control = this.getTitleControl(form);
    if (control?.errors?.['required']) return 'Title is required!';
    if (control?.errors?.['minlength']) return 'Title must be at least 3 characters!';
    return '';
  }

  getDescriptionErrorMessage(form: FormGroup): string {
    const control = this.getDescriptionControl(form);
    if (control?.errors?.['required']) return 'Caption is required!';
    if (control?.errors?.['minlength']) return 'Caption must be at least 5 characters!';
    return '';
  }

  getImageUrlErrorMessage(form: FormGroup): string {
    const control = this.getImageUrlControl(form);
    if (control?.errors?.['pattern']) return 'Image URL must be a valid link to an image!';
    return '';
  }

  markFormTouched(form: FormGroup): void {
    Object.values(form.controls).forEach(control => control?.markAsTouched());
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

  getFormValue(form: FormGroup) {
    const { title, description, imageUrl } = form.value;
    return { title, description, imageUrl };
  }
}
