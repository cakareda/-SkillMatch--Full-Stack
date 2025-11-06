import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. HttpClient ve Interceptor'ı eklemek için import et
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// 🔥 2. DÜZELTME:
// Artık 'AuthInterceptor' sınıfını değil, 'authInterceptorFn' fonksiyonunu import et
import { authInterceptorFn } from './services/auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 🔥 3. DÜZELTME:
    // HttpClient'ı ve 'authInterceptorFn' fonksiyonunu burada tanıt
    provideHttpClient(
      withInterceptors([authInterceptorFn])
    )
  ]
};