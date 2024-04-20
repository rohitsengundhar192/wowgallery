import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }
  headerPosition: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.headerPosition = true;
    } else {
      this.headerPosition = false;
    }
  }




  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }
}
