import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
  import { AlertifyService } from '../_services/alertify.service';
  import { AuthService } from '../_services/auth.service';
  import { Injectable } from '@angular/core';
  
  @Injectable({
    providedIn: 'root'
  })
  export class StartAuthguard implements CanActivate {
    constructor(
      private routeSerivce: Router,
      private authService: AuthService
    ) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      if (this.authService.isLoggedIn()) {
        this.routeSerivce.navigate(['/user-list']);
        return false;
      }
      return true;
    }
  }