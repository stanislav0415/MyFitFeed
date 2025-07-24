import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  serverErrorMessage: string | null = null;
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get showEmailError(): boolean {
    return !!this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get showPasswordError(): boolean {
    return !!this.password?.invalid && (this.password?.dirty || this.password?.touched);
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) return 'Email is required!';
    if (this.email?.errors?.['email']) return 'Invalid email!';
    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['required']) return 'Password is required!';
    if (this.password?.errors?.['minlength']) return 'Password must be at least 5 characters!';
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          console.log('Login successful:', user);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.serverErrorMessage =  err.error.error ||'Login failed. Please check your credentials.';
          this.loginForm.markAllAsTouched();
        },
      });
    }
  }
}
