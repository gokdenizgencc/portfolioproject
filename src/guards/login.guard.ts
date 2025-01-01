import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toasterservice = inject(ToastrService);
  const router = inject(Router);
  if(authService.isAuthenticated()){
    return true;
  }
  else{
    router.navigate(["login"])
    toasterservice.info("Sisteme giriş yapmalısınız")
    return false;
  }
};
