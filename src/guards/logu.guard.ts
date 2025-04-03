import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { map, of, tap } from 'rxjs';

export const loguGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);
  const toasterService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return authService.isAuthenticate().pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          router.navigate(['homepage']); 
        }
      }),
      map(isAuthenticated => !isAuthenticated) // Giriş yapmamışsa true, yapmışsa false döndür
    );
  } else {
    return of(false); // Eğer platform browser değilse, erişimi engelle
  }
};
