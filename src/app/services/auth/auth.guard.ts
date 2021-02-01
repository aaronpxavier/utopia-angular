import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  private readonly unguardedRoutes = ['login', 'signup'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthorized = this.authService.isAuthenticated();
    const routeNotGuarded = this.unguardedRoutes.includes(childRoute.url[0]?.toString());

    if (isAuthorized && routeNotGuarded) {
      this.router.navigate(['']);
      return true;
    } else if (isAuthorized || routeNotGuarded) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
