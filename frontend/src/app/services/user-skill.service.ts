import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service'; 
// 🔥 DÜZELTME: Bu import yolunun doğru olduğundan %100 emin olmalıyız.
// Bu yol, 'model' klasörünün 'app' klasörünün tam altında olduğunu varsayar.
import { User } from '../model/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserSkillService {
  
  private userSkillsSubject = new BehaviorSubject<string[]>([]);
  public userSkills$ = this.userSkillsSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api/profile'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) {
    if (this.authService.getToken()) {
      this.loadSkillsFromBackend();
    }
  }

  public loadSkillsFromBackend(): void {
    this.http.get<User>(`${this.apiUrl}/me`).subscribe({
      next: (user) => {
        this.userSkillsSubject.next(user.userSkills || []);
      },
      error: (err) => {
        console.error('Kullanıcı skilleri yüklenemedi:', err);
        this.userSkillsSubject.next([]); 
      }
    });
  }

  public updateUserSkills(skills: string[]): Observable<User> {
    // profile.component.ts bu fonksiyonun Observable döndürmesini bekliyor.
    return this.http.put<User>(`${this.apiUrl}/skills`, skills).pipe(
      tap(updatedUser => {
        this.userSkillsSubject.next(updatedUser.userSkills);
      })
    );
  }

  public getCurrentSkills(): string[] {
    return this.userSkillsSubject.getValue();
  }
}