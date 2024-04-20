import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthserviceService } from 'src/app/shared/services/api/jwtauthservice.service';
import { CephService } from 'src/app/shared/services/ceph/ceph.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';
import { GetlargeImageComponent } from '../../../Helper-Component/getlarge-image/getlarge-image.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-add-ins-art-image',
  templateUrl: './add-ins-art-image.component.html',
  styleUrls: ['./add-ins-art-image.component.scss'],
})
export class AddInsArtImageComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  firstFormGroup = this._formBuilder.group({
    input: ['', Validators.required],
  });

  get categoryforms() {
    return this.firstFormGroup.get('categoryforms');
  }
  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  searchContact: any;
  contact_list: any;
  searchText!: string;
  volunteerID: any;
  listofUserId: string[] = [];
  loginuserdetails: any;
  country_code: any;
  customer_id: any;
  user_id: any;
  gallery_file_category: number = 1;

  private submitSubject = new Subject<any>();
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<AddInsArtImageComponent>,
    private _snackbar: SnackBarService,
    private api_service: ApiService,
    private _formBuilder: FormBuilder,
    private _dataShare: DataSharingService,
    private _apiservice: ApiService,
    private loader: CustomSpinnerService,
    private _cephService: CephService,
    private _snackBarService: SnackBarService,
    private authService: JwtauthserviceService,
    private dialog: MatDialog,

    public MatDialogRef: MatDialogRef<AddInsArtImageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//

  async ngOnInit(): Promise<void> {
    // this.customer_id = 1
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id = token.user.user_id;
    this.bucketName = `${this.country_code}-${this.customer_id}`;
    this.getstudent();
    this.getloginuserdetails();
    this.getuploadeddatettime();
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //popup select user category
  getstudent() {
    this._apiservice
      .getalluserscheckbox(this.country_code, this.customer_id, this.user_id)
      .subscribe((res) => {
        this.contact_list = res.data;
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
  //login user details
  login_first_name: any;
  login_last_name: any;
  login_category: any;
  customer_image: any;
  getloginuserdetails() {
    this._apiservice
      .getloginuserdetails(this.country_code, this.customer_id, this.user_id)
      .subscribe((res) => {
        this.loginuserdetails = res.data[0].reply;
        this.login_first_name = this.loginuserdetails.first_name;
        this.login_last_name = this.loginuserdetails.last_name;
        this.login_category = this.loginuserdetails.category_aut;
        this.customer_image = this.loginuserdetails.customer_image;
      });
  }

  //get uploaded datetime
  uploadeddatetime: any;
  uploadtime: any;
  currentDate: Date = new Date();

  getuploadeddatettime() {
    this.uploadtime = this.currentDate;
  }

  //get uploaded images
  uploadediamges: any;
  bucketName: any;
  images: any;
  searchWords: any;

  //* --------------------------  Public methods  --------------------------*//
  cantegory_name: any;

  //mat-select-students
  get searchWord() {
    return this.contact_list.filter((conversation: any) => {
      return (
        conversation.user_details.first_name
          .toLowerCase()
          .includes(this.searchWords.toLowerCase()) |
        conversation.user_details.last_name
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

  replytype: any;
  gallery_c_file_id: any;
  onGetValue(event: any) {
    let value = event.target.value;
    this.replytype = value;
  }
  comment_id_get_id_first_reply: any;
  tableData: any[] = [];
  disablesavebtn: boolean = true;
  isrowselectedfirstreply(e: any) {
    if (e.length > 0) {
      this.disablesavebtn = true;
    } else {
      this.disablesavebtn = false;
    }

    this.comment_id_get_id_first_reply = e.user_details.user_id;

    const index = this.tableData.findIndex(
      (x) => x == this.comment_id_get_id_first_reply
    );
    if (index < 0) {
      this.tableData.push(this.comment_id_get_id_first_reply);
    } else {
      this.tableData.splice(index, 1);
    }
  }
  //* ------------------------------ Helper Function -----------------------*//
  onNoClick(): void {
    this.loginDialogRef.close(true);
  }

  addUserToGroup(userId: any) {
    if (this.listofUserId.length == 0) {
      this.listofUserId.push(userId.user_id);
    } else {
      const isExist = this.listofUserId.includes(userId.user_id);
      if (isExist == true) {
        let index = this.listofUserId.indexOf(userId.user_id);
        this.listofUserId.splice(index, 1);
      } else {
        this.listofUserId.push(userId.user_id);
      }
    }
  }

  imageUrll: any;
  fileToUpload: any;
  videoUrl: any;

  // In your component class:

  lastImageUrl: any = null;
  lastVideoUrl: any = null;
  lastFile: any = null;

  showData = true;

  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     if (file.type.startsWith('image/')) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         this.lastImageUrl = reader.result as string;
  //         this.lastVideoUrl = null;
  //         this.lastFile = file;
  //       };
  //       reader.readAsDataURL(file);
  //     } else if (file.type.startsWith('video/')) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         this.lastVideoUrl = reader.result as string;
  //         this.lastImageUrl = null;
  //         this.lastFile = file;
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }
  getsizecomvideo() {
    // this.showvid=true;
    const dialogRef = this.dialog.open(GetlargeImageComponent, {
      disableClose: false,
      height: 'auto',
      minWidth: '250px',
      width: 'auto',
    });
  }

  notallowed: boolean = false;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // File size in MB

    if (fileSize > 50) {
      // alert("File size exceeds the maximum limit of 2MB.");
      this.notallowed = true;
      event.target.value = ''; // Clear the input field
    } else {
      this.notallowed = false;
      // File size is within the limit, proceed with further actions
      // You can add your own logic here
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.lastImageUrl = reader.result as string;
            this.lastVideoUrl = null;
            this.lastFile = file;
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.lastVideoUrl = reader.result as string;
            this.lastImageUrl = null;
            this.lastFile = file;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
  //ceph

  //Upload File
  onUploadFileCephStorage() {
    // let formData: FormData = new FormData();
    // formData.append('attachments', this.getFileUpload);
    // formData.append('bucket_name', this.bucketName);
    // formData.append('file_name', 'test');
    // formData.append('is_private', 'false');
    // formData.append('uploaded_created_via_app_id', '32');
    // formData.append('is_uploaded_created_via_customapp', 'false');
    let photoFormData: any = new FormData();
    photoFormData.append('is_uploaded_created_via_customapp', false);
    photoFormData.append('app_id', 21);
    photoFormData.append('app_type', 0);
    photoFormData.append('file_name', 'unsigned_form');
    photoFormData.append('attachments', this.getFileUpload);
    photoFormData.append('bucket_name', this.bucketName);

    this._cephService.createFile(photoFormData).subscribe((res) => {
      console.log(res, 'res');

      this.gallery_c_file_id = res.data.file_cloud_storage_path;
      if (res?.statusCode == 200) {
        this.onNoClick();
        this._snackBarService.success(res.message);
      }

      let body: any = {
        country_code: this.country_code,
        customer_id: this.customer_id,
        gallery_file_description: this.replytype,
        gallery_file_uploaded_by_user_id: this.user_id,
        gallery_file_upload_datetime: this.uploadtime,
        gallery_cloud_file_id: this.gallery_c_file_id,
        tagged_user_id: this.checkeduserid,
        video_duration_in_sec: this.duration,
        login_id: this.user_id,
        gallery_file_category: this.gallery_file_category,
      };

      this._apiservice.saveinsertinsart(body).subscribe((res) => {
        if (res.statusCode == 201) {
          this._snackbar.success(res.message);
          this.onNoClick();
        } else {
          this._snackbar.error(res.message);
        }
      });
      this.loginDialogRef.close({ event: true, data: 'true' });
    });
  }

  isVideoLoaded: any;
  getFileUpload: any;
  duration: any;
  time: any;
  disablefileuploadimage: boolean = true;
  public browseVideo(event: any) {
    this.time = event.timeStamp;
    const timeStampInSeconds = event.timeStamp / 1000;
    const file = event.target.files[0];
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      this.duration = video.duration.toFixed(2);
    };
    video.src = URL.createObjectURL(file);

    if (event.target.files.length > 0) {
      this.disablefileuploadimage = false;
    } else {
      this.disablefileuploadimage = true;
    }

    this.isVideoLoaded = true;
    let e = event.target as HTMLInputElement;
    if (e.files && e.files[0]) {
      this.getFileUpload = e.files[0];
    }
  }

  user_pro_image_cus: any;
  user_profile_cu(e: any) {
    const fileName = e.split('.')[0]; // Split the string by '.' and take the first part
    const number = parseInt(fileName); // Parse the resulting string to an integer
    this.user_pro_image_cus = number;
  }

  imageuser_id: any;
  handleImageError() {
    this.customer_image = null; // Set customer_image to null or assign another fallback value
  }
  isButtonDisabled = false;

  disableButton() {
    this.isButtonDisabled = true;
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
  //Get File
  imageUrl: any;
  getCephUploadedFiles(bucket_name: string, key: string) {
    // this.loader.open();
    this._cephService.getFile(bucket_name, key).subscribe(
      async (res) => {
        this.imageUrl = await this.arrayBufferToBase64(res);
      },
      (err) => {
        this._snackBarService.error(err.error.text);
      }
    );
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    var blob = new Blob([buffer], { type: 'blob' });
    var reader = new FileReader();
    let base64 = new Promise((reslove: any, reject: any) => {
      reader.onload = (evt: any) => {
        reslove(evt.target.result);
      };
    });
    reader.readAsDataURL(blob);
    return base64;
  }

  //checkbox
  selection = new SelectionModel<any>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contact_list.length;
    return numSelected === numRows;
  }

  checkeduserid: any;
  selectAllChecked: boolean = false;
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.contact_list.forEach((row: any) => this.selection.select(row));
    }
  }

  changedata(checked: any) {
    // let use_ids:any
    this.checkeduserid = this.selection.selected.map(
      (item) => item.user_details.user_id
    );
    console.log(this.checkeduserid.length);

    if (this.checkeduserid.length > 0) {
      this.disablesavebtn = false;
    } else {
      this.disablesavebtn = true;
    }
  }
  //! -------------------------------  End  --------------------------------!//
}
