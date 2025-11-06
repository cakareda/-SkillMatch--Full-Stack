import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list';
import { LoginComponent } from './components/login/login.component';
import { AdminApplicationListComponent } from './components/admin-application-list/admin-application-list';
import { AuthGuard } from './services/auth.guard'; // YENİ GUARDI IMPORT ET
import { ProfileComponent } from './components/profile/profile.component'; // YENİ COMPONENTI IMPORT ET

export const routes: Routes = [
  // Ana sayfa her zaman iş listesini göstersin
  { path: '', component: JobListComponent },
  
  // Login sayfası
  { path: 'login', component: LoginComponent },
  
  // YENİ: Profil Sayfası (Sadece giriş yapanlar görebilir)
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard] // AuthGuard ile koru
  },

  // Admin Başvuru Listesi (Bunu da AuthGuard ile korumalıyız)
  { 
    path: 'admin/applications', 
    component: AdminApplicationListComponent,
    canActivate: [AuthGuard] // Admin rolü kontrolü de eklenebilir
  },

  // Diğer tüm yolları ana sayfaya yönlendir
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
