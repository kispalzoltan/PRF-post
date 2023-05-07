import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/api/post`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/post/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}/api/post`, post);
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.BASE_URL}/api/post/${id}`, post);
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.BASE_URL}/api/post/${id}`);
  }
}

