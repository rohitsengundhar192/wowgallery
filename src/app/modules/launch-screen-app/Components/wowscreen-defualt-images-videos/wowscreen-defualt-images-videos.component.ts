import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';
import { ApiService } from 'src/app/shared/services/api/api.service';
import * as XLSX from 'xlsx';
import { AddNewInsVideoPhotoComponent } from '../../Helper-Component/add-new-ins-video-photo/add-new-ins-video-photo.component';
import { JwtauthserviceService } from 'src/app/shared/services/api/jwtauthservice.service';
import { CephService } from 'src/app/shared/services/ceph/ceph.service';
import { FormControl } from '@angular/forms';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { forkJoin } from 'rxjs';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from 'src/app/shared/services/custom-spinner/spinner.component';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
@Component({
  selector: 'app-wowscreen-defualt-images-videos',
  templateUrl: './wowscreen-defualt-images-videos.component.html',
  styleUrls: ['./wowscreen-defualt-images-videos.component.scss'],
})
export class WowscreenDefualtImagesVideosComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;
  @ViewChild('myVideo') videoElement!: ElementRef;
  showPlayButton: boolean = true;

  playVideo() {
    this.videoElement.nativeElement.play();
    this.showPlayButton = false;
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  rowValue: any[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  filterValue = '';
  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4'];
  country_code: any;
  customer_id: any;
  user_id: any;

  bucketName: string = 'getwow-education';
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private authService: JwtauthserviceService,
    private _apiservice: ApiService,
    private _cephService: CephService,
    private _dataShare: DataSharingService,
    private _snackbar: SnackBarService,
    public _tokenService: TokenService,
    private _spinner: CustomSpinnerService,
    private _headertitle: HeaderTitleService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this._headertitle.setTitle(`GETster Screen Default Images / Videos`);
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id = token.user.user_id;
    this.gettabledata();
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  //get all details table
  getuploadimge: any;
  restable: any;
  element: any;

  datas1: any;
  getApi: any;
  datas: any;
  file: any;
  imageUrl: any;

  gettabledata() {
    this._spinner.open();
    this._apiservice
      .getalldatascreendefault(
        this.country_code,
        this.customer_id,
        this.currentPage,
        this.pageSize
      )
      .subscribe((res) => {
        let loopdata: any[] = [];
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];

          loopdata.push(element);
        }
        const pushtable: any[] = [];

        for (let q = 0; q < loopdata.length; q++) {
          let total_count = loopdata[q].countt;

          let gallery_cloud_file_id = loopdata[q].info[0].cloud_file_storage_id;

          this._cephService
            .getFileMultipleFilesBasedOnKeymanage(
              this.bucketName,
              gallery_cloud_file_id
            )
            .subscribe((res) => {
              for (let d = 0; d < res.length; d++) {
                const element = res[d];
                Reflect.defineProperty(loopdata[q], 'images', {
                  value: 'data:*;base64,' + res[d].file,
                });
                Reflect.defineProperty(loopdata[q], 'file_name', {
                  value: res[d].name,
                });

                let tableData: any[] = [];

                if (res) {
                  for (let i = 0; i < loopdata.length; i++) {
                    let datass = loopdata[i];

                    let datas = {
                      getster_screen_image_video_id:
                        datass.info[0].getster_screen_image_video_id,
                      display_from_datetime:
                        datass.info[0].display_from_datetime,
                      display_upto_datetime:
                        datass.info[0].display_upto_datetime,
                      taggedusercount:
                        datass.info[0].taggedusercount?.block_entry_datetime,
                      is_time_bound: datass.info[0].is_time_bound,
                      images: datass.images,
                      cloud_file_storage_id:
                        datass.info[0].cloud_file_storage_id,
                    };
                    tableData.push(datas);
                  }
                }

                this.dataSource.data = tableData;
                setTimeout(() => {
                  this.paginator.pageIndex = this.currentPage;
                  this.paginator.length = total_count;
                }, 0);
              }
              this._spinner.close();
            });
        }
      });
  }

  yes: number = 0;
  no: number = 1;
  //update enable for wowscreen
  enablewowscreens: boolean = true;
  enablewowscreen() {
    let body: any = {
      is_enabled_for_app_and_getster_screen_display: this.btnenable,
      blocked_wow_screen_image_video_id: this.getster_screen_image_video_id,
      login_id: this.user_id,
    };
    this._apiservice.updateenableforwowscreendefualt(body).subscribe((res) => {
      if (res.statusCode == 200) {
        this._snackbar.success(res.message);
      } else {
        this._snackbar.error(res.message);
      }
      this.setlimitbtnenable = true;
      this.showdefault = false;

      // this.getwowscreen();
      this.gettabledata();
    });
  }
  //* --------------------------  Public methods  --------------------------*//

  gallery_file_upload_id: any;
  gallery_file_uploaded_by_user_id: any;
  gallery_file_upload_datetime: any;
  gallery_file_description: any;
  is_enabled_for_app_and_getster_screen_display: any;
  gallery_cloud_file_id: any;
  rowvalues: any;
  gallery_file_upload_idd: any;
  file_name: any;
  disabletrimvideobtn: boolean = true;
  video_duration_in_sec: any;
  disabledelete: boolean = true;
  myFormControl = new FormControl('');
  is_trimmed_to_under_10_seconds!: number;
  is_video!: number;
  is_trimmed_to_10_seconds: any;
  pushtable: any[] = [];
  enlargedImages: any[] = [];
  getster_screen_image_video_id: any;
  // btndisablecreate
  showdefault: boolean = false;
  btnenable: any;
  total: any;
  btndisable: boolean = true;
  setlimitbtnenable: boolean = true;
  disabled(element: any) {
    console.log(element);
    this.showdefault = true;
    this.rowvalues = element;
    this.getster_screen_image_video_id = element.getster_screen_image_video_id;
    this.gallery_file_upload_id = element.cloud_file_storage_id;
    this.gallery_file_uploaded_by_user_id =
      element.gallery_file_uploaded_by_user_id;
    this.gallery_file_upload_datetime = element.gallery_file_upload_datetime;
    this.gallery_file_description = element.gallery_file_description;
    this.is_enabled_for_app_and_getster_screen_display =
      element.taggedusercount;
    this.gallery_cloud_file_id = element.cloud_file_storage_id;
    this.gallery_file_upload_idd = element.gallery_file_upload_id;
    this.file_name = element.file_name;
    this.video_duration_in_sec = element.video_duration_in_sec;
    this.is_trimmed_to_under_10_seconds =
      element.is_trimmed_to_under_10_seconds;
    this.is_video = element.is_video;
    this._dataShare.radioButtonFunctionTwo(false);
    this._dataShare.disabledData(element);

    if (this.is_enabled_for_app_and_getster_screen_display != undefined) {
      this.btndisable = true;
      this.btnenable = 0;
    } else {
      this.btnenable = 1;
      this.btndisable = false;
    }

    if (this.btnenable != undefined) {
      this._apiservice
        .getenablestatuscountdefault(this.country_code, this.customer_id)
        .subscribe((res) => {
          this.total = res.data[0].totalcount;

          if (this.btnenable == 1 && this.total >= 10) {
            this.setlimitbtnenable = true;
            this._snackbar.success('10 Images are already blocked. Enable 1 photo to block that photo')
          } else {
            this.setlimitbtnenable = false;
          }
        });
    }

    //image to show
    this._cephService
      .getFileMultipleFilesBasedOnKeymanage(
        this.bucketName,
        this.gallery_cloud_file_id
      )
      .subscribe((res) => {
        for (let k = 0; k < res.length; k++) {
          const element = res[k];
          this.pushtable[0] = {
            images: 'data:*;base64,' + res[k].file,
            file_name: res[k].name,
          };
        }
      });
    this.showPlayButton = true;
  }

  //* ------------------------------ Helper Function -----------------------*//
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  applyFilter(filterValue: string) {
    // this.filterValue = (event.target as HTMLInputElement).value;
    // this.filterValue = this.filterValue.trim(); // Remove whitespace
    // this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = this.filterValue;
    // this.gettabledata();
    this.filterValue = filterValue.trim().toLowerCase();

    // Apply filter to the data source
    this.dataSource.filter = this.filterValue;

    // If a paginator is available, reset to the first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.rowValue = this.selection.selected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }
  ngDoCheck(): void {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.gettabledata();
  }
  showPageSizeOptions: boolean = true;
  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }
  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */

    var xlsx_cols = [
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 10 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
    ];
    ws['!cols'] = xlsx_cols;
    XLSX.writeFile(wb, fileName, { type: 'buffer' });
  }
  onPrint() {
    window.print();
  }
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);

    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);
    let app_name: string = token1.user.registered_educational_institution_name;
    let districtStatePincode: string = `${token1.user.city_district_county} ${token1.user.state_province} ${token1.user.pin_code};`;
    let addressline1_adressline2: string = ` ${token1.user.address_line_1} ${token1.user.address_line_2};`;

    let customer_logo = ` ${environment.ceph_URL}${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png`;

    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '.mat-table {' +
        '   width: 100%' +
        '}' +
        '.mat-column-col2 {' +
        'width:10%' +
        '}' +
        '.mat-radio-container {' +
        '   display: none' +
        '}' +
        '</style>' +
        `</head>

        <body onload="window.print()">
        <style>
          .mat-column-select{display:none}
          .matCellDef,th,td,img{
            height: 50px;
            width: 50px;
            padding-left:10px;

          }


          </style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">

          <img style="width:100px;height:100px" onerror="this.src='assets/logo.png'" src="${customer_logo}" alt="app-logo" />

          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${app_name}</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">GETster Screen Default Images / Videos</span>
            <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${
          this.paginator.length
        } ) ${
          this.filterValue.length >= 1
            ? `(Filtered by -" ${this.filterValue} )`
            : ''
        } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
          </div>
          </div>

          ` +
        printContents +
        '</body>' +
        `
          <footer style="position: fixed; bottom: 0; width: 100%;">
          <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${addressline1_adressline2} </span>
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${districtStatePincode}</span>
          </div>
          </footer>
        ` +
        '</html>'
    );
    popupWin.document.close();
  }

  //! -------------------------------  End  --------------------------------!//
}
export interface PeriodicElement {
  col1: number;
  col2: string;
  col3: string;
  col4: string;
}
