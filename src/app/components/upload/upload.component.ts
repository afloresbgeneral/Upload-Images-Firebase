import { Component, OnInit } from '@angular/core';

import { FileItem } from '../../models/file-item';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];
  isHover = false;

  constructor(public uploadService: UploadService) { }

  ngOnInit() {
  }

  uploadImage() {
    this.uploadService.uploadFirebaseImage(this.files);
  }

  test(event: any) {
    console.log(event);
  }

  clear() {
    this.files = [];
  }

}
