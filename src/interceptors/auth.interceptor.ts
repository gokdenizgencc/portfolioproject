import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { request } from 'http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;

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

  return next(newRequest);
};