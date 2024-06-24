// services/tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Tag } from '../interface/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3400/tag';

  constructor(private http: HttpClient) {}

  createTag(taskId:number,tagData: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/create`, tagData);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/all`);
  }

  getTagById(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${tagId}`);
  }

  updateTag(tagId: number, updatedTagData: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/update/${tagId}`, updatedTagData);
  }

  deleteTag(tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${tagId}`);
  }
}
