import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { Photo } from './../../_models/Photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
import { error } from 'util';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
    @Input() photos: Photo[];
    @Output() getMemberPhotoChange = new EventEmitter<string>();
    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    currentMain: Photo;

    constructor(private _service: AuthService, private _userService: UserService,
      private alertify: AlertifyService) { }

    ngOnInit() {
      this.initializeUploader();
    }

    fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }

    initializeUploader() {
      this.uploader = new FileUploader({
        url : this.baseUrl + 'users/' + this._service.decodedToken.nameid + '/photos',
        authToken: 'bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      });

      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const res: Photo = JSON.parse(response);
          const photo = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain
          };
          this.photos.push(photo);
        }
      };
    }

    setMainPhoto(photo: Photo) {
        this._userService.setMainPhoto(this._service.decodedToken.nameid, photo.id).subscribe(() => {
        this.currentMain = _.findWhere(this.photos, {isMain: true});
        this.currentMain.isMain = false;
        photo.isMain = true;
        this._service.changeMemberPhotoUrl(photo.url);
        this._service.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this._service.currentUser));
      }, error => this.alertify.error(error));
    }

    deletePhoto(id: number) {
      console.log('deletePhoto' + ' ' + id);
      this.alertify.confirm('Are you sure you want to delete the photo?', () => {
        this._userService.deletePhoto(this._service.decodedToken.nameid, id).subscribe(() => {
          this.photos.splice(_.findIndex(this.photos, {id: id}), 1);
          this.alertify.success('Photo has been deleted.');
        }, error => {
          this.alertify.error('Failed to delete photo.');
      })
    })
  }
}
