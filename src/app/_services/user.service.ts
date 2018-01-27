import { User } from './../_models/User';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;
    constructor(private _authHttp: AuthHttp) {}


    getUsers(): Observable<User[]> {
        return this._authHttp.get(this.baseUrl + 'users')
        .map(response => <User[]> response.json())
        .catch(this.handleError);
    }

    getUser(id: number): Observable<User> {
        return this._authHttp.get(this.baseUrl + 'users/' + id)
        .map(response => <User> response.json())
        .catch(this.handleError);
    }

    updateUser(id: number, user: User) {
        return this._authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
    }

    setMainPhoto(userId: number, id: number) {
        return this._authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {})
        .catch(this.handleError);
    }

    deletePhoto(userId: number, id: number) {
        return this._authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id)
        .catch(this.handleError);
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
