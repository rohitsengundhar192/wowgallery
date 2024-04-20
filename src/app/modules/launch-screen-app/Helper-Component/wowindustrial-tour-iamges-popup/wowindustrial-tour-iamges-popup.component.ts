import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';
import { ApiService } from 'src/app/shared/services/api/api.service';
import * as XLSX from 'xlsx';
import { AddNewInsVideoPhotoComponent } from '../../Helper-Component/add-new-ins-video-photo/add-new-ins-video-photo.component';
import { CephService } from 'src/app/shared/services/ceph/ceph.service';
import { JwtauthserviceService } from 'src/app/shared/services/api/jwtauthservice.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { EditAddNewInsVideoPopupComponent } from '../../Edit-component/edit-add-new-ins-video-popup/edit-add-new-ins-video-popup.component';
import { TrimVideoPopupComponent } from '../../Helper-Component/trim-video-popup/trim-video-popup.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { FormControl } from '@angular/forms';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-wowindustrial-tour-iamges-popup',
  templateUrl: './wowindustrial-tour-iamges-popup.component.html',
  styleUrls: ['./wowindustrial-tour-iamges-popup.component.scss']
})
export class WowindustrialTourIamgesPopupComponent implements OnInit{
//* --------------------------  Start  -----------------------------------*//
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild('paginatorElement', { read: ElementRef })
  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  rowValue: any[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  filterValue = '';
  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col5', 'col6'];
  country_code: any;
  customer_id: any;
  user_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(    private _apiservice: ApiService,
    private dialog: MatDialog,
    private _cephService: CephService,
    private authService: JwtauthserviceService,
    private _dataShare: DataSharingService,
    private el: ElementRef,
    private _snackbar: SnackBarService,
    private _spinner: CustomSpinnerService,
    private _http: HttpClient,
    public _tokenService: TokenService,
    private _headertitle: HeaderTitleService) {}

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
  datasoucedata: any;
  gettabledata(){
    this._apiservice.getalldatascreendefault(
      this.country_code,
      this.customer_id,
      this.currentPage,
      this.pageSize
    ).subscribe((res)=>{
      console.log(res.data);
      this.datasoucedata = res.data;

      // this.firstFormGroup.controls['edit'].patchValue(this.datasoucedata.user_details.reply_from_comment_tex);
      let tableData: any[] = [];

      if (res) {
        for (let i = 0; i < this.datasoucedata.length; i++) {
          let datass = this.datasoucedata[i];
          console.log(datass);

          let datas = {
            getster_screen_image_video_id:datass.info[0].getster_screen_image_video_id,

          };
          tableData.push(datas);
        }
        this.dataSource.data = tableData;
        console.log(tableData,'first');

      }

    })
  }
  //* --------------------------  Public methods  --------------------------*//
  formControl = new FormControl('');
  showData = true;
  makenull() {
    // this.myFormControl.setValue('');
    // this.showData = !this.showData;
  }

  onButtonClick(inputField: any) {
    // clear the form control by setting the value to an empty string
    this.formControl.setValue('');
    // reset the form control to clear any validation errors and reset any dirty or touched status
    inputField.control.reset();
  }
  // Your component code

  // Define the isVideoFile() function
  isVideoFile(fileName: string): boolean {
    const videoExtensions = [
      '.mp4',
      '.avi',
      '.mkv',
      '.mov',
      '.wmv',
      '.flv',
      '.mpeg',
      '.webm',
      '.3gp',
      '.3g2',
    ];
    const extension = fileName
      ?.substring(fileName.lastIndexOf('.'))
      .toLowerCase();
    return videoExtensions.includes(extension);
  }

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
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

    let customer_logo = ` ${environment.ceph_URL}/${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png;`;
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
        '   width: 85%' +
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

          <ng-container *ngIf="!customer_logo">
            <img
              src="../../../../../assets/images/getwow.education.png"
              style="width:60px;height:54px border-radius: 10px"

            />
          </ng-container>
        </div>

           <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${app_name}</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Institutional Photos / Videos</span>
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

  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}

export interface PeriodicElement {
  col1: number;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
}
