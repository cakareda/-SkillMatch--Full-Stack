// frontend/src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

// 🔥 Çözüm: @Injectable olduğu için zaten modül olarak görülmeli. 
// Hata devam ederse, klasör adının doğru olduğundan emin ol!
@Injectable({
  providedIn: 'root'
})
export class AuthService { // class'ın export edildiğinden emin ol

  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.isAdminSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.isAdminSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAdminSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}