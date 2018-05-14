import { Injectable, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  }                           from '@angular/router';
  import { AuthService }      from '../../services/authService/auth.service';
import { 
    AuthModule,
    OidcSecurityService,
    OpenIDImplicitFlowConfiguration,
    OidcConfigService,
    AuthWellKnownEndpoints

 } from 'angular-auth-oidc-client';
 @Injectable()
 export class AuthGuard implements CanActivate {
 
     constructor(protected router: Router, protected authService: AuthService)
     {
 
     }
 
     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
   debugger;
         if (state.url !== '/login' && !this.authService.isAuthenticated()) {
            this.authService.login();
             return false;
         }
 
         return true;
     }
 }