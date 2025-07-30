import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service.js';

@Component({
  selector: 'home', 
  templateUrl: './home.html'
})
export class Home {
  protected authService = inject(AuthService);

  constructor(private router: Router) {}

  handleGetStarted(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/posts']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
