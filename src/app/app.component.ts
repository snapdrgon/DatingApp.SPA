import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _service: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this._service.currentUser = user;
      this._service.changeMemberPhotoUrl(user.photoUrl);
    }
    if (token !== null) {
      this._service.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
