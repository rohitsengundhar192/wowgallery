import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-getlarge-image',
  templateUrl: './getlarge-image.component.html',
  styleUrls: ['./getlarge-image.component.scss']
})
export class GetlargeImageComponent implements OnInit {
  dialogRef: any;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() image: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}
