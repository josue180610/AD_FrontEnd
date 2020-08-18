import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TDPAuthenticationService, TDPLocalStorageService, JwtToken } from '@tdp/ng-commons';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorage: TDPLocalStorageService,
    private authService: TDPAuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /* if (!this.localStorage.getItem(environment.sessionKeyName)) {
      this.router.navigateByUrl('/login');
      return;
    }

    const token = this.localStorage.getItem(environment.sessionKeyName);
    const tokenObject = this.authService.createToken(JwtToken, token);

    if (!tokenObject.isValid()) {
      this.router.navigateByUrl('/login');
      return;
    }

    return !!this.localStorage.getItem(environment.sessionKeyName); */
    if (!localStorage.getItem("auth")){
      this.router.navigateByUrl('/login');
      return;
    }
    return !!localStorage.getItem("auth");
     
  }
}
