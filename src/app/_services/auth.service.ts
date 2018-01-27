import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    baseUrl = environment.apiUrl + 'auth/';
    userToken: any;
    currentUser: User;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();
    private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    constructor(private _http: Http) { }

    login(model: any) {

        return this._http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
            const user = response.json();
            if (user) {
            localStorage.setItem('token', user.tokenString);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.currentUser = user.user;
            this.userToken = user.tokenString;
            this.changeMemberPhotoUrl(this.currentUser.photoUrl);
            }

        }).catch(this.handleError);

    }

    changeMemberPhotoUrl(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }

    register(model: any) {
        return this._http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
    }

    logedIn() {
        return tokenNotExpired('token');
    }

    requestOptions() {
        const headers = new Headers({'Content-type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');

        if (applicationError) {
            return Observable.throw(applicationError);
        }

        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        return Observable.throw(
           modelStateErrors || 'Server Error'
        );
    }
}
