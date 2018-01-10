import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any= {};

  constructor(private _service: AuthService) { }

  ngOnInit() {
  }

  register() {
    this._service.register(this.model).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }

}
