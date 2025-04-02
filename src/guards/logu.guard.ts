import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs';

export const loguGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);
  const toasterService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    // `isAuthenticate()` fonksiyonunun döndürdüğü `Observable<boolean>`'a abone olmalıyız
    return authService.isAuthenticate().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; 
        } else {

          router.navigate(['homepage']);

          return false;
        }
      })
    );
  } else {
    return false; // Eğer platform browser değilse, false döndür
  }
};
