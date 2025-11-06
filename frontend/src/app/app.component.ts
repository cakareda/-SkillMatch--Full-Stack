import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // *ngIf ve | async pipe için
import { AuthService } from './services/auth.service'; // Giriş durumunu kontrol etmek için
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  // Template'in ihtiyaç duyduğu modülleri import et
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // app.css'i de bağlayalım
})
export class AppComponent {
  title = 'frontend';
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    // AuthService'den isAdmin$ observable'ını al
    this.isAdmin$ = this.authService.isAdmin$;
  }

  /**
   * 🔥 GÜNCELLEME:
   * Sizin HTML'iniz (click)="onLogout()" çağrısı yapıyor.
   * Bu fonksiyon, authService'deki asıl logout'u tetikler.
   */
  onLogout(): void {
    this.authService.logout();
  }
}
