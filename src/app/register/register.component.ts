import { PasswordValidators } from './../_validators/pasword-validators';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any= {};
  registerForm: FormGroup;
  pw: PasswordValidators;


  constructor(private _service: AuthService, private _alertify: AlertifyService) {
      this.registerForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('',[Validators.required])
    }, this.pw.passwordMatchValidator)
   }

  ngOnInit() {
  }

  register() {
//    this._service.register(this.model).subscribe(response => {
//      this._alertify.success('Registration successful.');
//    },
//    error => {
//      this._alertify.error(error);
//    });
  console.log(this.registerForm.value);
  }


  cancel() {
    this.cancelRegister.emit(false);
  }

}
