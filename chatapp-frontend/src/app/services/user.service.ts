import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  userLogin(body: LoginRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl.concat('/login'), body);
  }

  userRegister(body: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl.concat('/register'), body);
  }

  getAllUsersExceptCurrentUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.baseUrl.concat('/except/' + this.currentUser().userId)
    );
  }

  getConversationIdByUser1IdAndUser2Id(
    user1Id: number,
    user2Id: number
  ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl.concat('/conversation/id'), {
      params: { user1Id: user1Id, user2Id: user2Id },
    });
  }

  currentUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
