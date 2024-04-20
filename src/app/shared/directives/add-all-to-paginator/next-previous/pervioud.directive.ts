import { Directive, ElementRef, HostListener } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { ImageDataService } from 'src/app/shared/services/image-data/image-data.service';

@Directive({
  selector: '[prevdirective]',
})
export class prevDirective {
  constructor(
    private el: ElementRef,
    private imageDataService: ImageDataService,
    private _datashare: DataSharingService
  ) {}

  @HostListener('click')
  prevFunc() {
    const previousImageData = this.imageDataService.getPreviousImageData();
    console.log(previousImageData, 'prev');

    this._datashare.ChangeImagePrevious(previousImageData);
    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName('item');
    elm.prepend(item[item.length - 1]);
  }
}
