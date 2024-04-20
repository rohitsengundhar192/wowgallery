import { Directive,ElementRef,HostListener } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { ImageDataService } from 'src/app/shared/services/image-data/image-data.service';

@Directive({
  selector: '[appNext]',
})
export class nextDirective {

  constructor(private el:ElementRef,private imageDataService:ImageDataService,private _datashare:DataSharingService ){

  }

  @HostListener('click')
  nextFunc(){
    const nextImageData = this.imageDataService.getNextImageData();
    console.log(nextImageData,'next');

    this._datashare.ChangeImage(nextImageData);

    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName("item");
    elm.append(item[0]);
  }
}
