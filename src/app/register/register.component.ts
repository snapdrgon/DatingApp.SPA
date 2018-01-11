import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any= {};

  constructor(private _service: AuthService, private _alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this._service.register(this.model).subscribe(response => {
      this._alertify.success('Registration successful.');
    },
    error => {
      this._alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
