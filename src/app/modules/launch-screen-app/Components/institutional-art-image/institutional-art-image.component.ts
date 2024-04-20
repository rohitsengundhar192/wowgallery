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
import { forkJoin, map } from 'rxjs';
import { AddInsArtImageComponent } from './add-ins-art-image/add-ins-art-image.component';
import { EditInsArtImageComponent } from './edit-ins-art-image/edit-ins-art-image.component';
import { TestingComponent } from '../testing/testing.component';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
@Component({
  selector: 'app-institutional-art-image',
  templateUrl: './institutional-art-image.component.html',
  styleUrls: ['./institutional-art-image.component.scss'],
})
export class InstitutionalArtImageComponent implements OnInit {
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
  displayedColumns: string[] = ['col1', 'col2', 'col5', 'col6'];
  studentDatas: any;
  searchWords: any;
  selected: any;
  country_code: any;
  customer_id: any;
  user_id: any;
  login_first_name: any;
  login_last_name: any;
  login_category: any;
  loginuserdetails: any;
  element: any;
  btndisablecreate: boolean = true;
  gallery_file_category: number = 1;
  bucketName: any;
  radioButtonClicked: boolean = false;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _apiservice: ApiService,
    private dialog: MatDialog,
    private _cephService: CephService,
    private authService: JwtauthserviceService,
    private _dataShare: DataSharingService,
    private el: ElementRef,
    private _snackbar: SnackBarService,
    private _spinner: CustomSpinnerService,
    private _http: HttpClient,
    public _tokenService: TokenService,
    private _headertitle: HeaderTitleService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit() {
    this._headertitle.setTitle(`Institutional Art / Images`);
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id = token.user.user_id;

    this.bucketName = `${this.country_code}-${this.customer_id}`;
    this.getstudentdetailsselect();
    this.getuploadedimages();
    this.gettabledata();
    this.getalldata();
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  getstudentdetailsselect() {
    this._apiservice
      .parent_child_select(this.country_code, this.customer_id,this.user_id)
      .subscribe((res) => {});
  }
  passdatavalue: any;
  check(item: any) {
    this.radioButtonClicked = true;

    console.log(item, 'item');
    // this.fileFormat = item.file_name.split('.').pop(); // Extract file format from filename

    // this.gallery_file_upload_id = item.gallery_file_upload_id;
    // // this.is_enabled_for_app_and_getster_screen_display =

    // if (this.fileFormat != 'mp4') {
    //   this.enablewowscreens = false;
    // } else {
    //   this.enablewowscreens = true;
    // }

    this._dataShare.shareDataWhileImage(item);
    if (item) {
      this.btndisablecreate = false;
    } else {
      this.btndisablecreate = true;
    }

    this._apiservice
      .getenablestatuscount(
        this.country_code,
        this.customer_id,
        this.gallery_file_category
      )
      .subscribe((res) => {
        console.log(res, 're');

        this.total = res.data[0].totalcount;
        if (this.total >= 25) {
          this.setlimitbtnenable = true;
        } else {
          this.setlimitbtnenable = false;
        }
      });
  }
  user_pro_image_id: any;
  user_pro_image_cus: any;
  user_profile(e: any) {
    this.user_pro_image_id = e.user_details.tagged_user_id;
  }
  user_profile_cu(e: any) {
    const fileName = e.split('.')[0]; // Split the string by '.' and take the first part
    const number = parseInt(fileName); // Parse the resulting string to an integer
    this.user_pro_image_cus = number;
  }

  imageuser_id: any;

  openUserProfile() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.user_pro_image_id,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  openUserProfilecus() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.user_id,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  file_upload_id: any[] = [];
  datee: any;
  getalldata() {
    this._apiservice
      .getalldata(
        this.country_code,
        this.customer_id,
        this.gallery_file_category
      )
      .subscribe((res) => {
        this.datee = res.data;
        for (let l = 0; l < this.datee.length; l++) {
          const element = this.datee[l];
          this.datetimeupload.push(element.gallery_file_upload_datetime);
          this.file_gallery.push(element.gallery_file_upload_id);
          this.file_date.push(element.gallery_file_upload_datetime);
          this.file_upload_id.push(element.gallery_file_uploaded_by_user_id);
        }
      });
  }

  //get uploaded images
  uploadediamges: any;

  images: any;

  imagedata: any[] = [];
  uploaddatetime: any;
  getuploadedimages() {
    const arr: any[] = [];
    this._apiservice
      .getuploadedimagesinsart(
        this.country_code,
        this.customer_id,
        this.gallery_file_category
      )
      .subscribe((res) => {
        this.uploadediamges = res.data;
        for (let i = 0; i < this.uploadediamges.length; i++) {
          const element = this.uploadediamges[i].gallery_cloud_file_id;
          const fileIdWithoutExtension = element.split('.')[0];
          this.uploaddatetime =
            this.uploadediamges[i].gallery_file_upload_datetime;
          arr.push(fileIdWithoutExtension);
        }

        this._cephService
          .getFileMultipleFilesBasedOnKey(this.bucketName, arr)
          .subscribe((res) => {
            for (let k = 0; k < res.length; k++) {
              const element = res[k];

              this.imagedata.push({
                images: 'data:*;base64,' + res[k].file,
                file_name: res[k].name,
                date: this.datetimeupload[k],
                file_id: this.file_gallery[k],
                aca_year: this.file_year[k],
                up_date: this.file_date[k],
                gallery_file_uploaded_by_user_id: this.file_upload_id[k],

                gallery_cloud_file_id: res[k].name,
                gallery_file_upload_datetime: this.datetimeupload[k],
                gallery_file_upload_id: this.file_gallery[k],
              });
            }
          });
      });
  }

  //get all details table
  getuploadimge: any;
  restable: any;
  datetimeupload: any[] = [];

  gettabledata() {
    this._spinner.open();
    this._apiservice
      .getalldataindphovidinsart(
        this.country_code,
        this.customer_id,
        this.gallery_file_category,
        this.currentPage,
        this.pageSize
      )
      .subscribe((res) => {
        if (res.data?.length == 0) {
          this.dataSource.data = [];
          this._snackbar.success('Data Not Found');
        }

        this.restable = res.data;
        if (this.restable.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spinner.close();
        }
        let loopdata: any[] = [];
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          loopdata.push(...element.info);
        }
        const pushtable: any[] = [];

        for (let q = 0; q < loopdata.length; q++) {
          let gallery_cloud_file_id = loopdata[q].gallery_cloud_file_id;
          const fileIdWithoutExtension = gallery_cloud_file_id.split('.')[0];
          this._cephService
            .getFileMultipleFilesBasedOnKey(
              this.bucketName,
              fileIdWithoutExtension
            )
            .subscribe((res) => {
              console.log(res, 're');

              Reflect.defineProperty(loopdata[q], 'images', {
                value: 'data:*;base64,' + res[0].file,
              });
              Reflect.defineProperty(loopdata[q], 'file_name', {
                value: res[0].name,
              });
              this._spinner.close();
              this.dataSource.data = loopdata;
              setTimeout(() => {
                this.paginator.pageIndex = this.currentPage;
                this.paginator.length = this.restable[0].countt;
              }, 0);
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
      country_code: this.country_code,
      customer_id: this.customer_id,
      is_enabled_for_app_and_getster_screen_display:
        this.is_enabled_for_app_and_getster_screen_display,
      gallery_file_upload_id: this.gallery_file_upload_id,
      login_id: this.user_id,
    };
    this._apiservice.updateenableforwowscreeninsart(body).subscribe((res) => {
      if (res.statusCode == 200) {
        this._snackbar.success(res.message);
        this.enablewowscreens = true;
        this.file_id = [];
        this.btndisablecreate=true;
      } else {
        this._snackbar.error(res.message);
      }
      this.selectedimage = [];
      this.gettabledata();
    });
  }
  getfile() {
    this._spinner.open();
    this._cephService
      .getFile(this.bucketName, this.gallery_cloud_id_without_extension)
      .subscribe((res) => {
        if (res) {
          this._spinner.close();
        }

        const blob = new Blob([res], { type: 'application/octet-stream' });
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${this.country_code}_${this.customer_id}_edu_${this.gallery_cloud_id_without_extension}.${this.fileFormat}`;

        link.click();
      });
  }

  //* --------------------------  Public methods  --------------------------*//
  timeStampDetails: any;
  enlargedImages: any[] = [];
  image_name: any;
  showimage: boolean = false;
  selectedItemIndex: number = -1;
  aca_year: any;
  up_date: any;
  selectedOption!: string;
  file_gallery: any[] = [];
  file_date: any[] = [];
  file_year: any[] = [];
  file_id: any;
  disableRedBorder: boolean = false;
  selectedRadioIndex: number = -1;
  showEnlarged(image: any, index: number, option: string) {
    this.image_name = image.file_name;
    this.file_id = image.file_id;
    this.selectedimage = image.file_name;
    this.aca_year = image.aca_year;
    this.up_date = image.up_date;
    this.gallery_file_uploaded_by_user_id =
      image.gallery_file_uploaded_by_user_id;

    this.showData = true;

    this.showimage = true;
    this.enlargedImages[0] = image;
    this.selectedItemIndex = index;
    this.showPlayButton = true;

    if (option === 'radio') {
      this.selectedRadioIndex = index;
    } else {
      this.selectedRadioIndex = -1;
    }

    if (this.file_id != undefined) {
      this._apiservice
        .getdesc(this.country_code, this.customer_id, this.file_id)
        .subscribe((res) => {
          this.gallery_file_description = res.data[0].gallery_file_description;
        });
    }

    if (this.file_id != undefined) {
      //get tagged user details
      this._apiservice
        .gettaggeduserdetails(this.country_code, this.customer_id, this.file_id)
        .subscribe((res) => {
          this.studentDatas = res.data;
        });

      //get login user details
      this._apiservice
        .getloginuserdetails(
          this.country_code,
          this.customer_id,
          this.gallery_file_uploaded_by_user_id
        )
        .subscribe((res) => {
          this.loginuserdetails = res.data[0].reply;
          this.login_first_name = this.loginuserdetails.first_name;
          this.login_last_name = this.loginuserdetails.last_name;
          this.login_category = this.loginuserdetails.category_aut;
          this.customer_image = this.loginuserdetails.customer_image;
        });
    }
  }

  closeEnlarged(index: number) {
    this.enlargedImages.splice(index, 1);
  }

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
  fileFormat: any;
  customer_image: any;
  gallery_cloud_id_without_extension: any;
  selectedimage: any;
  setlimitbtnenable: boolean = true;
  // btndisablecreate
  total: any;
  iconColor: string = 'gray';
  disabled(element: any) {
    this.rowvalues = element;
    this.iconColor = 'blue'; // Change the color to blue when clicked
    this.imagedata.map((item: any, index: number) => {
      if (item.file_name === element.gallery_cloud_file_id) {
        this.selectedimage = item.file_name;
      }
    });
    this.gallery_file_upload_id = element.gallery_file_upload_id;
    this.gallery_file_uploaded_by_user_id =
      element.gallery_file_uploaded_by_user_id;
    this.gallery_file_upload_datetime = element.gallery_file_upload_datetime;
    this.gallery_file_description = element.gallery_file_description;
    this.is_enabled_for_app_and_getster_screen_display =
      element.is_enabled_for_app_and_getster_screen_display;
    this.gallery_cloud_file_id = element.gallery_cloud_file_id;
    this.gallery_cloud_id_without_extension =
      this.gallery_cloud_file_id.split('.')[0];
    this.gallery_file_upload_idd = element.gallery_file_upload_id;
    this.file_name = element.file_name;
    this.video_duration_in_sec = element.video_duration_in_sec;
    this.is_trimmed_to_under_10_seconds =
      element.is_trimmed_to_under_10_seconds;
    this.is_video = element.is_video;
    this._dataShare.radioButtonFunctionTwo(false);
    this._dataShare.disabledData(element);
    this.radioButtonClicked = true;
    this.showData = true;

    this.fileFormat = element.file_name.split('.').pop(); // Extract file format from filename
    if (this.is_video == 1) {
      this.disabletrimvideobtn = false;
    } else {
      this.disabletrimvideobtn = true;
    }

    if (
      this.is_trimmed_to_under_10_seconds == 0 &&
      this.video_duration_in_sec != null
    ) {
      this.disabletrimvideobtn = false;
    } else {
      this.disabletrimvideobtn = true;
    }
    const duration = parseFloat(this.video_duration_in_sec);
    if (duration > 11.0) {
      this.disabletrimvideobtn = false;
    } else {
      this.disabletrimvideobtn = true;
    }

    //conditions
    if (this.is_video == 0) {
      this.enablewowscreens = false;
    } else {
      this.enablewowscreens = true;
    }

    //other icons disable
    if (this.gallery_file_upload_id) {
      this.btndisablecreate = false;
    } else {
      this.btndisablecreate = true;
    }

    //get tagged user details
    this._apiservice
      .gettaggeduserdetails(
        this.country_code,
        this.customer_id,
        this.gallery_file_upload_id
      )
      .subscribe((res) => {
        this.studentDatas = res.data;
      });

    //get login user details
    this._apiservice
      .getloginuserdetails(
        this.country_code,
        this.customer_id,
        this.gallery_file_uploaded_by_user_id
      )
      .subscribe((res) => {
        this.loginuserdetails = res.data[0].reply;
        this.login_first_name = this.loginuserdetails.first_name;
        this.login_last_name = this.loginuserdetails.last_name;
        this.login_category = this.loginuserdetails.category_aut;
        this.customer_image = this.loginuserdetails.customer_image;
      });

    this._apiservice
      .getenablestatuscount(
        this.country_code,
        this.customer_id,
        this.gallery_file_category
      )
      .subscribe((res) => {
        this.total = res.data[0].totalcount;
        if (
          element.is_enabled_for_app_and_getster_screen_display === 0 &&
          this.total >= 25
        ) {
          this.setlimitbtnenable = true;
        } else {
          this.setlimitbtnenable = false;
        }
      });
  }
  getCustomerProfileUrl(ceph_object_id: string) {
    let profileUrl =
      environment.ceph_URL +
      this.country_code +
      '-' +
      this.customer_id +
      '/' +
      ceph_object_id;
    return profileUrl;
  }
  handleImageError() {
    this.customer_image = null; // Set customer_image to null or assign another fallback value
  }
  //* ------------------------------ Helper Function -----------------------*//
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

    // if(this.dataSource.data.length>0){
    //   this.syllabusDetails();
    //   this.viewsyllabusbtn=false;
    //   this.viewsyllabusbtns=false;
    // }
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
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Institutional Art / Images</span>
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

  //mat-select-students
  get searchWord() {
    return this.studentDatas.filter((conversation: any) => {
      return (
        conversation.reply.first_name
          .toLowerCase()
          .includes(this.searchWords.toLowerCase()) |
        conversation.reply.last_name
          .toLowerCase()
          .includes(this.searchWords.toLowerCase())
      );
    });
  }

  openedChange(opened: boolean) {
    if (opened === true) {
      this.searchWords = null;
    }
  }
  radioButton(elememt: any, event: any) {}

  //open dialogue
  openDialog() {
    const dialogRef = this.dialog.open(AddInsArtImageComponent, {
      disableClose: true,
      height: '90%',
      minWidth: '250px',
      width: '555px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        this.gettabledata();
        this.radioButtonClicked = false;
        this.btndisablecreate = true;
        this.enablewowscreens = true;
        this.selectedimage = [];
        const arr: any[] = [];
        let datetimeupload: any[] = [];
        this._apiservice
          .getuploadedimagesindtour(
            this.country_code,
            this.customer_id,

            this.gallery_file_category
          )
          .subscribe((res) => {
            this.uploadediamges = res.data;
            for (let i = 0; i < this.uploadediamges.length; i++) {
              const element = this.uploadediamges[i].gallery_cloud_file_id;
              const fileIdWithoutExtension = element.split('.')[0];
              this.uploaddatetime =
                this.uploadediamges[i].gallery_file_upload_datetime;
              arr.push(fileIdWithoutExtension);
            }

            this._cephService
              .getFileMultipleFilesBasedOnKey(this.bucketName, arr)
              .subscribe((res) => {
                this.imagedata = [];
                for (let k = 0; k < res.length; k++) {
                  const element = res[k];

                  this.imagedata.push({
                    images: 'data:*;base64,' + res[k].file,
                    file_name: res[k].name,
                    date: datetimeupload[k],
                    file_id: this.file_gallery[k],
                    aca_year: this.file_year[k],
                    up_date: this.file_date[k],
                    gallery_file_uploaded_by_user_id: this.file_upload_id[k],

                    gallery_cloud_file_id: res[k].name,
                    gallery_file_upload_datetime: this.datetimeupload[k],
                    gallery_file_upload_id: this.file_gallery[k],
                  });
                }
              });
          });

        this._apiservice
          .getalldata(
            this.country_code,
            this.customer_id,
            this.gallery_file_category
          )
          .subscribe((res) => {
            this.datee = res.data;
            for (let l = 0; l < this.datee.length; l++) {
              const element = this.datee[l];
              datetimeupload.push(element.gallery_file_upload_datetime);
              this.file_gallery.push(element.gallery_file_upload_id);
              this.file_date.push(element.gallery_file_upload_datetime);
              this.file_upload_id.push(
                element.gallery_file_uploaded_by_user_id
              );
            }
          });
      }

      if (this.file_id != undefined) {
        this.file_id = [];
      }
    });
  }

  edit(): void {
    const dialogRef = this.dialog.open(EditInsArtImageComponent, {
      disableClose: true,
      // minWidth: '250px',
      height: '90%',
      width: '560px',
      minWidth: '250px',
      data: this.rowvalues,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.file_id = [];
      this.btndisablecreate = true;
      if (result.data) {
        this.gettabledata();
        let datetimeupload: any[] = [];
        this.myFormControl.setValue('');
        this.showData = !this.showData;
        this.btndisablecreate = true;
        this.enablewowscreens = true;
        this.radioButtonClicked = false;
        this.selectedimage = [];
        this.showimage = false;
        const arr: any[] = [];
        this._apiservice
          .getuploadedimagesindtour(
            this.country_code,
            this.customer_id,
            this.gallery_file_category
          )
          .subscribe((res) => {
            this.uploadediamges = res.data;
            for (let i = 0; i < this.uploadediamges.length; i++) {
              const element = this.uploadediamges[i].gallery_cloud_file_id;
              const fileIdWithoutExtension = element.split('.')[0];
              this.uploaddatetime =
                this.uploadediamges[i].gallery_file_upload_datetime;
              arr.push(fileIdWithoutExtension);
            }

            this._cephService
              .getFileMultipleFilesBasedOnKey(this.bucketName, arr)
              .subscribe((res) => {
                this.imagedata = [];
                for (let k = 0; k < res.length; k++) {
                  const element = res[k];

                  this.imagedata.push({
                    images: 'data:*;base64,' + res[k].file,
                    file_name: res[k].name,
                    date: datetimeupload[k],
                    file_id: this.file_gallery[k],
                    aca_year: this.file_year[k],
                    up_date: this.file_date[k],
                    gallery_file_uploaded_by_user_id: this.file_upload_id[k],

                    gallery_cloud_file_id: res[k].name,
                    gallery_file_upload_datetime: this.datetimeupload[k],
                    gallery_file_upload_id: this.file_gallery[k],
                  });
                }
              });
          });

        this._apiservice
          .getalldata(
            this.country_code,
            this.customer_id,
            this.gallery_file_category
          )
          .subscribe((res) => {
            this.datee = res.data;
            for (let l = 0; l < this.datee.length; l++) {
              const element = this.datee[l];
              datetimeupload.push(element.gallery_file_upload_datetime);
              this.file_gallery.push(element.gallery_file_upload_id);
              this.file_date.push(element.gallery_file_upload_datetime);
              this.file_upload_id.push(
                element.gallery_file_uploaded_by_user_id
              );
            }
          });
      }

      if (this.file_id != undefined) {
        this.file_id = [];
      }
    });
  }

  //open dialogue
  trimvideodialogueopen() {
    this.disabletrimvideobtn = true;
    const dialogRef = this.dialog.open(TrimVideoPopupComponent, {
      disableClose: true,
      // minWidth: '250px',
      height: '550px',
      width: '682px',
      minWidth: '350px',
      data: this.rowvalues,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        this.gettabledata();
      }
    });
  }
  //delete comformation dialogue
  delete() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      height: '150px',
      minWidth: '350px',
      data: this.rowvalues,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.file_id = [];
      this.btndisablecreate = true;
      this.enablewowscreens=true;
      if (res == 1) {
        let formData: FormData = new FormData();
        formData.append('bucket_name', this.bucketName);
        formData.append('key', this.gallery_cloud_file_id);

        this.myFormControl.setValue('');
        this.showData = !this.showData;
        this.radioButtonClicked = false;
        this.showimage = false;
        this.image_name = [];
        this.selectedimage = [];
        this.aca_year = [];
        this._cephService
          .deletefile(this.bucketName, this.gallery_cloud_file_id)
          .subscribe((res) => {
            if (res?.statusCode == 200) {
              this._snackbar.success(res.message);
            }
          });

        let datetimeupload: any[] = [];
        this._apiservice
          .deleteuserid(
            this.country_code,
            this.customer_id,
            this.gallery_file_upload_id,
            this.gallery_file_uploaded_by_user_id
          )
          .subscribe((res) => {
            if (res.statusCode == 200) {
              this._snackbar.success(res.message);
            } else {
              this._snackbar.error(res.message);
            }

            this.gettabledata();
            this.btndisablecreate = true;
            this.enablewowscreens = true;
            const arr: any[] = [];
            this._apiservice
              .getuploadedimagesindtour(
                this.country_code,
                this.customer_id,
                this.gallery_file_category
              )
              .subscribe((res) => {
                this.uploadediamges = res.data;
                for (let i = 0; i < this.uploadediamges.length; i++) {
                  const element = this.uploadediamges[i].gallery_cloud_file_id;
                  const fileIdWithoutExtension = element.split('.')[0];
                  this.uploaddatetime =
                    this.uploadediamges[i].gallery_file_upload_datetime;
                  arr.push(fileIdWithoutExtension);
                }

                this._cephService
                  .getFileMultipleFilesBasedOnKey(this.bucketName, arr)
                  .subscribe((res) => {
                    this.imagedata = [];
                    for (let k = 0; k < res.length; k++) {
                      const element = res[k];

                      this.imagedata.push({
                        images: 'data:*;base64,' + res[k].file,
                        file_name: res[k].name,
                        date: datetimeupload[k],
                        file_id: this.file_gallery[k],
                        aca_year: this.file_year[k],
                        up_date: this.file_date[k],
                        gallery_file_uploaded_by_user_id:
                          this.file_upload_id[k],

                        gallery_cloud_file_id: res[k].name,
                        gallery_file_upload_datetime: this.datetimeupload[k],
                        gallery_file_upload_id: this.file_gallery[k],
                      });
                    }
                  });
              });

            this._apiservice
              .getalldata(
                this.country_code,
                this.customer_id,
                this.gallery_file_category
              )
              .subscribe((res) => {
                this.datee = res.data;

                for (let l = 0; l < this.datee.length; l++) {
                  const element = this.datee[l];
                  datetimeupload.push(element.gallery_file_upload_datetime);
                  this.file_gallery.push(element.gallery_file_upload_id);
                  this.file_date.push(element.gallery_file_upload_datetime);
                  this.file_upload_id.push(
                    element.gallery_file_uploaded_by_user_id
                  );
                }
              });
          });
      }

      if (this.file_id != undefined) {
        this.file_id = [];
      }
    });
  }
}

interface instName {
  name: string;
}

export interface PeriodicElement {
  col1: number;
  col2: string;
  col4: string;
  col5: string;
  col6: string;
}

//! -------------------------------  End  --------------------------------!//
