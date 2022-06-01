import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth_service: AuthService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // not logged = redirect to login page
    if (this.auth_service.isLoggedOut() && state.url !== '/auth') {
      this.router.navigate(['/auth']);
      return false;
    }
    if (this.auth_service.isLoggedIn() && state.url === '/auth') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
