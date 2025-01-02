import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toasterService = inject(ToastrService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem("token"); // Tarayıcıda güvenli şekilde erişim
    if (token && authService.isAuthenticated()) {
      return true;
    }
    else{
  // Token yoksa veya doğrulama başarısızsa yönlendir
  router.navigate(["login"]);
  toasterService.info("Sisteme giriş yapmalısınız");
  return false;
    }
  }
  else{
    return false;
  }


};