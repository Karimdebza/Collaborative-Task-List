import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../interface/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3400/comments';
  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<any>(`${this.baseUrl}`, comment);
  }

  getComments(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${taskId}`);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${commentId}`);
  }

}
