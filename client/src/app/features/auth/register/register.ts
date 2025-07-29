import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterFormService } from '../forms/register.form';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formService = inject(RegisterFormService);

  registerForm = this.formService.createForm();
  serverErrorMessage: string | null = null;

  ngAfterViewInit(): void {}

  get username() {
    return this.formService.getUsernameControl(this.registerForm);
  }

  get email() {
    return this.formService.getEmailControl(this.registerForm);
  }

  get password() {
    return this.formService.getPasswordControl(this.registerForm);
  }

  get rePassword() {
    return this.formService.getRePasswordControl(this.registerForm);
  }

  get isUsernameValid(): boolean {
    return this.formService.isUsernameError(this.registerForm);
  }

  get isEmailValid(): boolean {
    return this.formService.isEmailError(this.registerForm);
  }

  get isPasswordsValid(): boolean {
    return this.formService.isPasswordError(this.registerForm);
  }

  get usernameErrorMessage(): string {
    return this.formService.getUsernameErrorMessage(this.registerForm);
  }

  get emailErrorMessage(): string {
    return this.formService.getEmailErrorMessage(this.registerForm);
  }

  get passwordErrorMessage(): string {
    return this.formService.getPasswordErrorMessage(this.registerForm);
  }

  get rePasswordErrorMessage(): string {
    return this.formService.getRePasswordErrorMessage(this.registerForm);
  }

  onSubmit(): void {
    if (this.formService.isFormValid(this.registerForm)) {
      const { username, email, password, rePassword } = this.formService.getFormValue(this.registerForm);

      this.authService.register(username, email, password, rePassword).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => {
          this.serverErrorMessage = err?.error?.error || 'Registration failed. Please try again.';
          this.formService.markFormTouched(this.registerForm);
        },
      });
    }
  }
}
