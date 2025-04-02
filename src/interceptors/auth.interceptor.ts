import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { request } from 'http';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const clonedRequest = req.clone({
    withCredentials: true,  // HttpOnly Cookie'nin backend'e otomatik gitmesi için
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const router = inject(Router);

      if (error.status === 401 || error.status === 403) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
