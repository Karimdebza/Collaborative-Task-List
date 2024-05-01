import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TaskInterfaceTs } from '../interface/task.interface.ts';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceTsService {

  constructor(private http:HttpClient) { }

  createTask(taskData:TaskInterfaceTs, userId:number): Observable<TaskInterfaceTs>{
    return this.http.post<TaskInterfaceTs>(`http://localhost:3400/task/create/${userId}`,taskData);
  }
  getAllTasks(userId: number): Observable<TaskInterfaceTs[]> {
    return this.http.get<TaskInterfaceTs[]>(`http://localhost:3400/task/all/${userId}`);
  }

  getTaskById(taskId: number): Observable<TaskInterfaceTs> {
    return this.http.get<TaskInterfaceTs>(`http://localhost:3400/task/${taskId}`);
  }

  updateTask(taskId: number, updatedTaskData: TaskInterfaceTs): Observable<TaskInterfaceTs> {
    return this.http.put<TaskInterfaceTs>(`http://localhost:3400/task/update/${taskId}`, updatedTaskData);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3400/task/delete/${taskId}`);
  }
}
