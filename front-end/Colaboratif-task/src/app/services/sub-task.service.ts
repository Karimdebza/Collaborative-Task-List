import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SubTask } from '../interface/sub-task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {
  constructor(private http: HttpClient) {}

  createSubTask(taskId:number,subTaskData: SubTask): Observable<SubTask> {
    return this.http.post<SubTask>(`http://localhost:3400/subtask/create/${taskId}`, subTaskData);
  }

  getAllSubTasks(taskId: number): Observable<SubTask[]> {
    return this.http.get<SubTask[]>(`http://localhost:3400/subtask/all/${taskId}`);
  }

  getSubTaskById(subTaskId: number): Observable<SubTask> {
    return this.http.get<SubTask>(`http://localhost:3400/subtask/${subTaskId}`);
  }

  updateSubTask(subTaskId: number, updatedSubTaskData: SubTask): Observable<SubTask> {
    return this.http.put<SubTask>(`http://localhost:3400/subtask/update/${subTaskId}`, updatedSubTaskData);
  }

  deleteSubTask(subTaskId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3400/subtask/delete/${subTaskId}`);
  }
}