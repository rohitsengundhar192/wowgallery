import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="flex justify-center ">
    <div class="lds-ripple ">
      <div></div>
      <div></div>
    </div>
  </div>`,
  styles: [
    `
      .custom-modalbox > mat-dialog-container {
        box-shadow: none !important;
        background: none !important;
      }

      .lds-ripple {
        display: inline-block;
        position: relative;
        width: 150px;
        height: 150px;
      }

      .lds-ripple div {
        position: absolute;
        border: 4px solid #3366ff;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        margin-left: 35px;
        margin-top: 35px;
      }

      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }

      @keyframes lds-ripple {
        0% {
          top: 36px;
          left: 36px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: 0px;
          left: 0px;
          width: 72px;
          height: 72px;
          opacity: 0;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent implements OnInit {
  title: any;
  message: any;
  constructor() {}

  ngOnInit(): void {}
}
