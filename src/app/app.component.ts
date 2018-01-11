import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelper } from 'angular2-jwt';

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
    this._service.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
