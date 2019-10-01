import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appDropFiles]'
})
export class DropFilesDirective {

  constructor() { }
  @Input() files: FileItem[] = [];
  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    console.log('onDragEnter');
    this.mouseHover.emit(true);
    this.preventChromeOpen(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    console.log('onDragLeave');
    this.mouseHover.emit(false);
    this.preventChromeOpen(event);

  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.preventChromeOpen(event);
    console.log('onDrop');
    this.mouseHover.emit(false);
    const transfer = this.getTransfer(event);
    if (!transfer) {
      return;
    }
    this.extractFiles(transfer.files);
    this.mouseHover.emit(false);

  }

  private extractFiles( fileList: FileList) {
    console.log(fileList);
    // tslint:disable-next-line: forin
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const tempFile = fileList[property];
      if (this.shouldUploadFile(tempFile)) {
        const newFileItem = new FileItem(tempFile);
        this.files.push(newFileItem);
      }
    }
    console.log('FILES ', this.files);
  }

  private getTransfer(event: any) {
    console.log('getTransfer ', event);
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // validaciones
  public shouldUploadFile(file: File): boolean {
    if (!this.validateDroppedFile(file.name) && this.validateType(file.type)) {
      return true;
    } else {
      return false;
    }
  }


  private preventChromeOpen(event) {
    // console.log('preventChromeOpen', event);
    event.preventDefault();
    event.stopPropagation();
  }

  private validateDroppedFile(fileName: string): boolean {
    for (const file of this.files) {
      if (file.name === fileName) {
        // console.log('File ', fileName , ' exist');
        return true;
      } else {
        return false;
      }
    }
  }

  private validateType(type: string): boolean {
    return (type === '' || type === undefined ) ? false : type.startsWith('image');
  }

}
