import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TaskListInterfaceTs } from '../interface/task-list.interface.ts';
@Injectable({
  providedIn: 'root'
})
export class TaskListServiceTsService {

  constructor(private http:HttpClient) { }

  getAllTaskLists(userId: number): Observable<TaskListInterfaceTs[]> {
    return this.http.get<TaskListInterfaceTs[]>(`http://127.0.0.1:3400/task-list/all/${userId}`);
  }

  getTaskListById(taskListId: number): Observable<TaskListInterfaceTs> {
    return this.http.get<TaskListInterfaceTs>(`http://127.0.0.1:3400/task-list/${taskListId}`);
  }

  createTaskList(taskListData: TaskListInterfaceTs, userId: number): Observable<TaskListInterfaceTs> {
    return this.http.post<TaskListInterfaceTs>(`http://127.0.0.1:3400/task-list/create/${userId}`, taskListData);
  }

  updateTaskList(taskListId: number, updatedTaskListData: TaskListInterfaceTs): Observable<TaskListInterfaceTs> {
    return this.http.put<TaskListInterfaceTs>(`http://127.0.0.1:3400/task-list/update/${taskListId}`, updatedTaskListData);
  }

  deleteTaskList(taskListId: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:3400/task-list/delete/${taskListId}`);
  }
}
