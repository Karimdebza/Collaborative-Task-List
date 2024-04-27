import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserInterfaceTs } from '../interface/user.interface.ts';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {

  constructor(private http: HttpClient) { }

  getUserById(userId:number) : Observable<UserInterfaceTs>{
    return this.http.get<UserInterfaceTs>(`http://127.0.0.1:3400/user/${userId}`)
  }
  createUser(userData:any) : Observable<UserInterfaceTs> {
    return this.http.post<UserInterfaceTs>(`http://127.0.0.1:3400/user/create`, userData);
  }
  getAllUsers(): Observable<UserInterfaceTs[]> {
    return this.http.get<UserInterfaceTs[]>('http://127.0.0.1:3400/user/all');
  }

  updateUser(userId: number, updatedUserData: any): Observable<UserInterfaceTs> {
    return this.http.put<UserInterfaceTs>(`http://127.0.0.1:3400/user/Update/${userId}`, updatedUserData);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:3400/user/delete/${userId}`);
  }
}
