import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { LoaderService } from 'src/app/shared/services/progress-bar-loader/loader.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InstallPwaService } from 'src/app/shared/services/Install-PWA/install-pwa.service';
import { StyleManager } from 'src/app/shared/services/style-manager/style-manager.service';

import { ConnectivityService } from 'src/app/shared/services/connectivity/connectivity.service';
import { Observable, Subscription } from 'rxjs';
import { NoInternetComponent } from 'src/app/shared/dialogs/no-internet/no-internet.component';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showInstallPromotion$ = this.appPwaService.showInstallPromotion$;

  selected: any = 'english';
  // form: FormGroup;
  @ViewChild('message') message!: ElementRef;

  appTitle: string = 'Demo Application Full Name';

  scrHeight: any;
  scrWidth: any;
  // isDark = this.styleManager.isDark;
  isOnline!: boolean;
  NetworkStatus$!: Subscription;
  offlineText = 'No internet connection. Data will not be saved!';
  backiconDisplay!: string;

  appInstalled: boolean = false;
  audit_trail$!: Observable<any>;

  showNavigation!: boolean;

  constructor(
    public navigation: NavigationService,
    public dialog: MatDialog,
    private router: Router,
    public loaderService: LoaderService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly appPwaService: InstallPwaService,
    private styleManager: StyleManager,
    private connection: ConnectivityService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _dataSharingService: DataSharingService,
    private _apiService: ApiService
  ) {
    this.getScreenSize();
  }
  titleLength: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  loginPage: any;
  ngOnInit(): void {
    if (this.location.isCurrentPathEqualTo('/app-store')) {
      this.showNavigation = false;
    } else {
      this.showNavigation = true;
    }

    this.router.events.subscribe((event) => {
      let urlLocationPath = this.location.path();
      if (urlLocationPath == '/app-store') {
        this.showNavigation = false;
      } else {
        this.showNavigation = true;
      }
    });

    this.audit_trail$ = this._dataSharingService.audit_trail_data;
    // this.loginPage = 0;
    // this.matIconRegistry.addSvgIconResolver((name, namespace) => {
    //   return namespace === ''
    //     ? this.domSanitizer.bypassSecurityTrustResourceUrl(
    //         `/assets/img/svg/${name}.svg`
    //       )
    //     : null;
    // });

    this.appPwaService.interceptDefaultInstall();
    // this.connection.isConnected$.subscribe(res=>{
    //   console.log(res);

    // })
    this.NetworkStatus$ = this.connection.isConnected$.subscribe((res) => {
      this.isOnline = res;
    });

    let messageOffline = () => {
      this.openNoInternetDialog();
    };

    window.addEventListener('offline', messageOffline);
    // window.addEventListener('online', messageOnline);
  }

  getclass() {
    if (this.isOnline === true) {
      return 'header-online';
    } else if (this.isOnline === false) {
      return 'header-offline';
    }
    return 'header-onLine';
  }

  onShare() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Share Via',
          text: 'This is the text which I will be sharing!',
          url: 'http://getbiz.app',
        })
        .then(() => {
          console.log('Called!');
          (<HTMLElement>this.message.nativeElement).innerHTML = 'Called!';
        })
        .catch((error) => {
          console.log('Error sharing:', error);
          (<HTMLElement>this.message.nativeElement).innerHTML =
            'Error: ' + error;
        });
    } else {
      console.error('navigator.share API not supported by the browser!');
      (<HTMLElement>this.message.nativeElement).innerHTML =
        'navigator.share API not supported by the browser!';
    }
  }

  async getPWADisplayMode() {}

  logOut() {
    localStorage.setItem('page', '1');
    this.router.navigate(['/app-store']).then(() => {
      // window.location.reload();
    });
  }
  installPromotion() {
    let browsername = sessionStorage.getItem('browsername');
    if (
      browsername !== 'Chrome' &&
      confirm(`For Better User Experience Use Chrome Browser`)
    ) {
      // window.location.reload();
      this.appPwaService.installPromotion();

      this.isInstalled();
      console.log(this.isInstalled());
    } else {
      this.appPwaService.installPromotion();

      this.isInstalled();
      console.log(this.isInstalled());
    }
  }

  isInstalled(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      window.navigator &&
      (window.navigator as any).standalone === true
    );
  }

  // toggleDarkTheme() {
  //   this.styleManager.toggleDarkTheme();
  //   this.isDark = !this.isDark;
  //   this.applyDarkDialog();
  // }

  // applyDarkDialog(): void {
  //   if (this.isDark) {
  //     localStorage.setItem('dark', 'true');
  //   } else {
  //     localStorage.setItem('dark', 'false');
  //   }
  // }

  openAuditTrail() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: '400px',
      minHeight: 'calc(100vh - 500px)',
    };

    // const auditTrailDialog = this.dialog.open(
    //   AuditTrailDialogComponent,
    //   config
    // );
  }

  openNoInternetDialog() {
    let config: MatDialogConfig = {
      disableClose: true,
      width: '400px',
      minHeight: 'calc(100vh - 600px)',
    };
    this.dialog.open(NoInternetComponent, config);
  }

  ngOndestroy() {
    this.NetworkStatus$.unsubscribe();
  }
}
