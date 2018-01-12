import { AlertifyService } from './../_services/alertify.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _service: AuthService, private _router: Router, private _alertify: AlertifyService){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
     if (this._service.logedIn()) {
       return true;
     }

     this._alertify.error('You need to be logged in to access this area');
     this._router.navigate(['/home']);
     return false;
  }
}
