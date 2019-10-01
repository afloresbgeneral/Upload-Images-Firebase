import * as firebase from 'firebase';

import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  fileItem: FileItem;
  private folder = 'img';

  constructor(private db: AngularFirestore) { }

  public uploadImage(image: { name: string, url: string}) {
    this.db.collection(`${this.folder}`)
      .add(image);
  }

  uploadFirebaseImage(images: FileItem[]) {
    console.log('Image from uploadFirebaseImage ', images);
    const storageRef = firebase.storage().ref();
    for ( const image of images) {
      image.isUploading = true;
      if (image.progress >= 100) {
        continue;
      }

      const uploadTask = storageRef.child(`${image.name}`)
            .put(image.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => image.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),

        () => {
          console.log('imagen cargada correctamente');
          uploadTask.snapshot.ref.getDownloadURL().then((res) => {
            console.log('test then ', res);
            image.url = res;
            image.isUploading = false;
            this.uploadImage({
              name: image.name,
              url: image.url
            });
          });

        });
    }
  }
}
