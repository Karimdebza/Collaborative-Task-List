import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceTsService } from '../services/user.service.ts.service';
export const authGuard: CanActivateFn = (route, state) => {
const authService = inject(UserServiceTsService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    return true;

  }else {
    router.navigate(["/signin"]);
    return false ;
  }
};
