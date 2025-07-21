import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  name: string = '';
  email: string = '';
  password: string = '';
  rePassword: string = '';

  nameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  rePasswordError: boolean = false;

  nameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  rePasswordErrorMessage: string = '';

  validateName(): void {
    if(!this.name){
      this.nameError = true;
      this.nameErrorMessage = 'Name is required!';
    } else {
      this.nameError = false;
      this.nameErrorMessage = '';
    }
  }

  validateEmail(): void {
    if(!this.email){
      this.emailError = true;
      this.emailErrorMessage = 'Email is required!';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is not valid!';
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }

 
  validatePassword(): void {
    if(!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required!';
    } else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 4 characters!';    
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }

    if (this.rePassword) {
      this.validateRePassword();
    }
  }

  validateRePassword(): void {
    if(!this.rePassword) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = 'Repeat Password is required!';
    } else if (this.password !== this.rePassword) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = 'Repeat Password does not match password!';    
    } else {
      this.rePasswordError = false;
      this.rePasswordErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return Boolean(this.name) && 
      Boolean(this.email) && 
      Boolean(this.password) && 
      Boolean(this.rePassword) && 
      !this.nameError && 
      !this.emailError && 
      !this.passwordError && 
      !this.rePasswordError;
  }

onSubmit(): void {

  this.validateName();
  this.validateEmail();
  this.validatePassword();
  this.validateRePassword();

  if (this.isFormValid()) {
    this.authService.register(
      this.name,
      this.email,
      this.password,
      this.rePassword
    ).subscribe({
      next: (success: boolean) => {
        console.log('Registration success:', success);
        if (success) {
          this.router.navigate(['/home']);
        } else {
          alert('Registration failed. Please try again.');
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('An error occurred during registration.');
      }
    });
  }
}



  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

}