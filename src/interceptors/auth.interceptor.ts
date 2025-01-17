import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { request } from 'http';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  let token: string | null = null;
  const router = inject(Router);
  try {
    // localStorage kontrolü
    token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  } catch (error) {
    console.warn('localStorage is not available:', error);
  }

  // Token mevcutsa isteği klonla ve Authorization başlığı ekle
  const newRequest = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
        localStorage.removeItem('token');
        router.navigate(['/login'])
      return throwError(error);
    })
  );
};