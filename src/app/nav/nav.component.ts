import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    model: any = {};
    photoUrl: string;

    constructor(public _service: AuthService,
       private _alertify: AlertifyService, private _router: Router) { }

    ngOnInit() {
      this._service.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    login() {
      this._service.login(this.model).subscribe( response =>    {
        this._alertify.success('Logged in successfully');
      },
      error => {
        this._alertify.error('Failed to login');
    },
    () => {
      this._router.navigate(['/members']);
    }
  );
  }

  logout() {
    localStorage.removeItem('user');
    this._service.userToken = null;
    localStorage.removeItem('token');
    this._service.currentUser = null;
    this._alertify.message('logged out');
    this._router.navigate(['/home']);
  }

  loggedIn() {
    return this._service.logedIn();
  }

}
