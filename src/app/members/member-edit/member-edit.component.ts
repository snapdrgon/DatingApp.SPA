import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

user: User;
photoUrl: string;

  constructor(private route: ActivatedRoute, private _alertify: AlertifyService,
              private _authService: AuthService, private _service: UserService ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this._authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {

    this._service.updateUser(this._authService.decodedToken.nameid, this.user).subscribe (next => {
      this._alertify.success('User profile updated.');
      this.editForm.reset(this.user);
    }, error => {
      this._alertify.error(error);
    });

  }

  updateMainPhoto(url: string) {
    this.user.photoUrl = url;

  }

}
