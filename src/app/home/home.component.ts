import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  values: any;
  registerMode = false;
  constructor(private _http: Http) { }

  ngOnInit() {
  }

  registerToggle()  {
    this.registerMode = true;
  }


  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
