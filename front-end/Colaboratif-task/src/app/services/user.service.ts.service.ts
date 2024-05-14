import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserInterfaceTs } from '../interface/user.interface.ts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {

  constructor(private http: HttpClient) { }

  getUserById(userId:number) : Observable<UserInterfaceTs>{
    return this.http.get<UserInterfaceTs>(`http://localhost:3400/user/${userId}`)
  }
  createUser(userData:UserInterfaceTs) : Observable<UserInterfaceTs> {
    return this.http.post<UserInterfaceTs>(`http://localhost:3400/user/create`, userData);
  }
  getAllUsers(): Observable<UserInterfaceTs[]> {
    return this.http.get<UserInterfaceTs[]>('http://localhost:3400/user/all');
  }

  updateUser(userId: number, updatedUserData: UserInterfaceTs): Observable<UserInterfaceTs> {
    return this.http.put<UserInterfaceTs>(`http://localhost:3400/user/Update/${userId}`, updatedUserData);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3400/user/delete/${userId}`);
  }

  signinUser(credentials:UserInterfaceTs): Observable<UserInterfaceTs> {
    return this.http.post<UserInterfaceTs>(`http://localhost:3400/user/auth`, credentials).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          const parts = token.split('.'); // Diviser le token JWT en ses parties
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1])); // Décoder la charge utile du token JWT
            const userId = payload.user_id; // Extraire l'ID de l'utilisateur de la charge utile
            localStorage.setItem('id_user', userId.toString());
          } else {
            console.error("Le token JWT n'est pas au format attendu :", token);
          }
        } else {
          console.error("Le token JWT est manquant dans la réponse :", response);
        }

      })
    )
}
}