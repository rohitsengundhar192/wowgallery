import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';

@Component({
  selector: 'app-getster-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss'],
})
export class UserProfileCardComponent implements OnInit, AfterViewInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('message') message!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('app_frame', { static: false }) appframe !: ElementRef;

  //* -----------------------  Variable Declaration  -----------------------*//

   iframeSource: string = 'https://p29.getwow.education';
  // iframeSource: string = 'http://192.168.29.173:4200';
  user_id!: number;
  customer_id!: number;
  country_id!: string;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _iframeService: IframeService,
    public _dialogRef: MatDialogRef<UserProfileCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _customSpinnerService: CustomSpinnerService
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  async ngOnInit(): Promise<void> {
    this.user_id = this.data.user_id;
    this.customer_id = this.data.customer_id;
    this.country_id = this.data.country_id;
  }
  ngAfterViewInit(): void {
    this.iframeLoaded();
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//

  iframeLoaded() {
    let iframe: HTMLIFrameElement = this.appframe
      .nativeElement as HTMLIFrameElement;
    iframe.src = String(this.iframeSource).toString();
    this._customSpinnerService.open();

    // Send a message to the child iframe
    iframe.addEventListener('load', (e) => {
      let body = {
        // access_token: localStorage.getItem('access_token'),
        dark: localStorage.getItem('dark') ?? true,
        user_id: this.user_id,
        customer_id: this.customer_id,
        country_id: this.country_id,
      };
      this.sendMessage(body, String(this.iframeSource).toString());
      this._customSpinnerService.close();
    });

    // Receive a message child to parent iframe
    window.addEventListener('message', (e) => {
      if (e.origin == this.iframeSource) {
        if (e.data) {
          this._iframeService.getIframeMessages(e.data);
        }
      }
    });
  }
  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    let iframeEl:any = this.appframe.nativeElement as HTMLIFrameElement;
    iframeEl.contentWindow.postMessage(JSON.stringify(body), targetOrigin);
    // iframeEl.contentWindow.postMessage(body, '*');
  }

  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
