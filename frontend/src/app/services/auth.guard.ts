import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // auth.service.ts'deki getToken() metodunu kullanıyoruz
    if (this.authService.getToken()) {
      // Giriş yapmış, sayfaya erişebilir
      return true;
    } else {
      // Giriş yapmamış, login sayfasına yönlendir
      this.router.navigate(['/login']);
      return false;
    }
  }
}