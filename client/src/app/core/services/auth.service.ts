import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/users';
   private readonly fullUrl = 'http://localhost:3000/users/register';
  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this._currentUser.set(user);
      this._isLoggedIn.set(true);
    }
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      this.http.post<{ user: User }>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true } 
      ).subscribe({
        next: (response) => {
          this._currentUser.set(response.user);
          this._isLoggedIn.set(true);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          observer.next(response.user);
          observer.complete();
        },
        error: (err) => {
          this._isLoggedIn.set(false);
          observer.error(err);
        }
      });
    });
  }
  register(name: string, email: string, password: string, rePassword: string): Observable<boolean> {
  return new Observable<boolean>(observer => {
    this.http.post<{ user: User }>(
      this.fullUrl,
      { name, email, password, rePassword },
      { withCredentials: true }

    ).subscribe({
      next: (response) => {
        this._currentUser.set(response.user);
        this._isLoggedIn.set(true);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        observer.next(true);
        observer.complete();
      },
      error: (err) => {
         console.error('Request URL:', `${this.apiUrl}/register`);  
        console.error('Registration HTTP Error:', err);      
        this._isLoggedIn.set(false);
        observer.error(err);  
      }
    });
  });
}


  logout(): Observable<void> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
        next: () => {
          this._currentUser.set(null);
          this._isLoggedIn.set(false);
          localStorage.removeItem('currentUser');
          observer.next();
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  getCurrentUser(): User | null {
    return this._currentUser();
  }

  getCurrentUserId(): string | null {
    return this._currentUser()?.id || null;
  }
}
