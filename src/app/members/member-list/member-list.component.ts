import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private _service: UserService, private alertify: AlertifyService,
     private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     this.users = data['users'];
   });
  }



}
