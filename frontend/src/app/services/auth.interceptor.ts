import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * 🔥 DÜZELTME:
 * Interceptor'ı 'class' (sınıf) yerine 'const' (fonksiyon) olarak tanımlıyoruz.
 * Bu, Angular 17+ ve standalone projeler için en doğru yöntemdir.
 */
export const authInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // AuthService'i 'inject' (enjekte et) fonksiyonu ile alıyoruz
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    // İsteği klonla ve 'Authorization' header'ına 'Bearer [token]' ekle
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    // Klonlanmış (imzalı) isteği backend'e gönder
    return next(authReq);
  }

  // Token yoksa (login/register sayfasıysa) isteği olduğu gibi gönder
  return next(req);
}