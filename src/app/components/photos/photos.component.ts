import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { FireImageInterface } from '../../interfaces/fire-image.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos: FireImageInterface[] = [];
  constructor(db: AngularFirestore) {
    db.collection('img').valueChanges().subscribe((resp: FireImageInterface[]) => {
      this.photos = resp;
      console.log('test ', this.photos);
    });
   }

  ngOnInit() {
  }

}
