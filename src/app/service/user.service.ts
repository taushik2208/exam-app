import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../model/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: UserDetail): Observable<UserDetail>{
    return this.http.post<UserDetail>('http://localhost:4200/create', user);
  }

  getAllUser(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>('http://localhost:4200/api/userdata');
  }

  scoreUpdate(user: UserDetail): Observable<UserDetail> {
    return this.http.put<UserDetail>(`http://localhost:4200/api/score/`, user);
  }
}
