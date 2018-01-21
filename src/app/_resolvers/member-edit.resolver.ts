import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private _service: UserService, private _router: Router,
        private alertify: AlertifyService, private _authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this._service.getUser(this._authService.decodedToken.nameid).catch(error => {
            this.alertify.error('Problem retrieving data.');
            this._router.navigate(['/members']);
            return Observable.of(null);
        });
    }
}
