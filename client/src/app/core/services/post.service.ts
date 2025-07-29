import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = 'http://localhost:3000/posts';
  constructor(private httpClient: HttpClient) {}

  createPost(postData: Omit<Post, 'id' | 'createdAt'>): Observable<Post> {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null;
    return this.httpClient.post<Post>(`${this.apiUrl}/create`, postData, {
      headers: { 'Content-Type': 'application/json', 
      Authorization: `Bearer ${token ?? ''}`},
    });
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl);
  }

  getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/${id}`);
  }

  updatePost(id: string, postData: Partial<Post>): Observable<Post> {
    return this.httpClient.put<Post>(`${this.apiUrl}/${id}`, postData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deletePost(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
