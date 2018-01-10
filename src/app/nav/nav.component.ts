import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    model: any = {};

    constructor(private _service: AuthService) { }

    ngOnInit() {
    }

    login() {
      this._service.login(this.model).subscribe( response =>    {
        console.log(response);
      },
      error => {
      console.log(error);
    });
  }

  logout() {
    this._service.userToken = null;
    localStorage.removeItem('token');
    console.log('logged out');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
