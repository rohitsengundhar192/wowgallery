import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
declare var GoogleTranslate: Function;
export let globalShareBaseOrigin: string;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager,
    private _cdf: ChangeDetectorRef
  ) {
    // this.baseOrigin = window.parent[0].location.ancestorOrigins[0];
    this.baseOrigin = window.location.ancestorOrigins[0];
    globalShareBaseOrigin = this.baseOrigin;
  }
// hi 
  @HostListener('document:mousemove')
  @HostListener('document:click')
  @HostListener('document:keydown')
  resetIdleTimeout() {
    this.sendMessage({ is_idle_active: false }, this.baseOrigin);
  }

  @HostListener('window:unload')
  unloadHandler() {
    localStorage.clear();
    this.clearCookies();
  }

  // baseOrigin: string = 'http://u3.getster.tech';
  baseOrigin!: string;
  isLoaded: boolean = false;

  ngOnInit() {
    // console.log(this.baseOrigin, 'baseOrigin');
    this._iframeService.getIframeData.subscribe({
      next: (data) => {
        // console.log(data);
        if (data) {
          this.styleManager.toggleDarkTheme(data.dark);
          setTimeout(() => {
            GoogleTranslate(data.googleTranslate);
          }, 1000);
        }
      },
    });
  }
  ngAfterViewInit(): void {
    this.iframeLoaded();
  }

  ngOnDestroy() {
    localStorage.clear();
    this.clearCookies();
  }

  clearCookies() {
    const cookies = document.cookie.split(';');
    const domain = window.location.hostname;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${domain};path=/`;
    }
  }

  iframeLoaded() {
    window.addEventListener('message', (e) => {
      if (e.origin == this.baseOrigin) {
        let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));

        for (const key in parentData) {
          // console.log(key, 'sdf');
          if (Object.prototype.hasOwnProperty.call(parentData, key)) {
            const value = parentData[key];
            localStorage.setItem(key, value);
          }
        }
        this.isLoaded = true;
        this._iframeService.sendIframeData(parentData);
        this._cdf.detectChanges();
        // this.sendMessage('Received From Child', e.origin);
      }
    });

    // Send data to parent message first time
    window.addEventListener('load', (e) => {
      this.sendMessage('Connected Successful.', this.baseOrigin);
      this._cdf.detectChanges();
    });
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
}
