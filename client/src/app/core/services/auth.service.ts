import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly registerUrl = 'http://localhost:3000/users/register';
  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();

  constructor(private httpClient: HttpClient) { }

  register(name: string, email: string, password: string, rePassword: string): Observable<User> {
    const body = JSON.stringify({ name, email, password, rePassword });
  
    return this.httpClient.post<User>(this.registerUrl, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        this._currentUser.set({ name, email, token: response.token });
        this._isLoggedIn.set(true);
      })
    );
  }


  getCurrentUser(): User | null {
    return this._currentUser();
  }
}
