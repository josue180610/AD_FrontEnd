import { Injectable } from "@angular/core";

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import {
  TDPAuthenticationService,
  TDPLocalStorageService,
  JwtToken,
} from "@tdp/ng-commons";
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from "@angular/platform-browser-dynamic";

@Injectable({
  providedIn: "root",
})
export class RolesGuardGuard implements CanActivate {
  constructor(
    private IlocalStorage: TDPLocalStorageService,
    private authService: TDPAuthenticationService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let temp = 0;
    let Modules = JSON.parse(this.IlocalStorage.getItem("modules"));
    console.log(Modules);
    Modules.forEach((element) => {
      element.views.forEach((a) => {
        if (a.path == state.url) {
          temp = 1;
        }
        console.log(temp);
      });
    });

    if (temp == 1 || state.url == "/") {
      return true;
    } else {
      this.router.navigateByUrl("");
      return false;
    }
  }
}
