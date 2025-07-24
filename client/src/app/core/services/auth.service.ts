import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly registerUrl = 'http://localhost:3000/users/register';
  private readonly loginUrl = 'http://localhost:3000/users/login';


  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this._isLoggedIn.set(true);
    }
  }


  register(name: string, email: string, password: string, rePassword: string): Observable<User> {
    const body = { name, email, password, rePassword };

    return this.httpClient.post<User>(this.registerUrl, body, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this._currentUser.set(response);
        this._isLoggedIn.set(true);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    const body = { email, password };

    return this.httpClient.post<User>(this.loginUrl, body, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this._currentUser.set(response);
        this._isLoggedIn.set(true);
      })
    );
  }



  logout(): void {
    this.httpClient.post('http://localhost:3000/users/logout', {}, {
      withCredentials: true
    }).subscribe(() => {
      this._currentUser.set(null);
      this._isLoggedIn.set(false);
    });
  }

  getCurrentUser(): User | null {
    return this._currentUser();
  }
}
