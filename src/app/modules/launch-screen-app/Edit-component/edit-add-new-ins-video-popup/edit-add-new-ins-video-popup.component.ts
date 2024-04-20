import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { uniqBy } from 'lodash';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthserviceService } from 'src/app/shared/services/api/jwtauthservice.service';
import { CephService } from 'src/app/shared/services/ceph/ceph.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';
import { GetlargeImageComponent } from '../../Helper-Component/getlarge-image/getlarge-image.component';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-add-new-ins-video-popup',
  templateUrl: './edit-add-new-ins-video-popup.component.html',
  styleUrls: ['./edit-add-new-ins-video-popup.component.scss'],
})
export class EditAddNewInsVideoPopupComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  firstFormGroup = this._formBuilder.group({
    inputfield: new FormControl(),
  });

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  searchContact: any;
  contact_list: any;
  searchText!: string;
  volunteerID: any;
  listofUserId: string[] = [];
  login_first_name: any;
  login_last_name: any;
  login_category: any;
  loginuserdetails: any;
  gallery_file_uploaded_by_user_id: any;
  gallery_file_upload_datetime: any;
  pushtable: any[] = [];
  bucketName: any;
  gallery_cloud_file_id: any;
  country_code: any;
  customer_id: any;
  user_id: any;
  studentDatas: any;
  gallery_file_upload_id: any;
  selectedValue1: any;
  customer_image: any;
  nottaggeduser: any;
  datapush: any[] = [];

  pushhingdata: any;
  gallery_cloud_id_without_extension: any;
  // data_for_check:any[]=[]
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<EditAddNewInsVideoPopupComponent>,
    private _snackbar: SnackBarService,
    private api_service: ApiService,
    private _formBuilder: FormBuilder,
    private _dataShare: DataSharingService,
    private _apiservice: ApiService,
    private _cephService: CephService,
    private authService: JwtauthserviceService,
    private _snackBarService: SnackBarService,
    private dialog: MatDialog,

    public MatDialogRef: MatDialogRef<EditAddNewInsVideoPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  gallery_file_uploaded_by_user_id_image: any;
  gallery_file_upload_datetime_image: any;
  gallery_cloud_file_id_image: any;
  gallery_cloud_id_without_extension_image: any;
  gallery_file_upload_id_image: any;
  changedata_1: any;
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  async ngOnInit(): Promise<void> {
    // this.customer_id = 1
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id = token.user.user_id;
    this.bucketName = `${this.country_code}-${this.customer_id}`;
    this.updateSelectedData();
  }
  obtaineddata: any;
  updateSelectedData() {
    this._dataShare.share_data_while_image_click_Data.subscribe((res) => {
      this.obtaineddata = res;
      if (res != undefined) {
        this.gallery_file_uploaded_by_user_id =
          this.obtaineddata.gallery_file_uploaded_by_user_id;
        this.gallery_file_upload_datetime =
          this.obtaineddata.gallery_file_upload_datetime;
        this.gallery_cloud_file_id = this.obtaineddata.gallery_cloud_file_id;
        this.gallery_cloud_id_without_extension =
          this.gallery_cloud_file_id?.split('.')[0];
        this.gallery_file_upload_id = this.obtaineddata.gallery_file_upload_id;

        this.firstFormGroup.controls['inputfield'].setValue(
          this.obtaineddata.gallery_file_description
        );

        //Image data
        //Get desc
        this._apiservice
          .getdesc(
            this.country_code,
            this.customer_id,
            this.gallery_file_upload_id
          )
          .subscribe((res) => {
            this.firstFormGroup.controls['inputfield'].setValue(
              res.data[0].gallery_file_description
            );
          });

        //Api's
        //get login user details
        this._apiservice
          .getloginuserdetails(
            this.country_code,
            this.customer_id,
            this.user_id
          )
          .subscribe((res) => {
            this.loginuserdetails = res.data[0].reply;
            this.login_first_name = this.loginuserdetails.first_name;
            this.login_last_name = this.loginuserdetails.last_name;
            this.login_category = this.loginuserdetails.category_aut;
            this.customer_image = this.loginuserdetails.customer_image;
          });

        //get tagged user details
        if (this.gallery_file_upload_id != undefined) {
          this._apiservice
            .gettaggeduserdetails(
              this.country_code,
              this.customer_id,
              this.gallery_file_upload_id
            )
            .subscribe((res) => {
              this.studentDatas = res.data;
              let pushdata: any[] = [];
              for (let i = 0; i < this.studentDatas.length; i++) {
                const element = this.studentDatas[i];
                this.nottaggeduser = element.user_details.tagged_user_id;
                pushdata.push(this.nottaggeduser);
              }
              this.datapush.push(...pushdata);
            });
        }

        //image to show
        this._cephService
          .getFileMultipleFilesBasedOnKey(
            this.bucketName,
            this.gallery_cloud_id_without_extension
          )
          .subscribe((res) => {
            for (let k = 0; k < res.length; k++) {
              const element = res[k];
              this.pushtable.push({
                images: 'data:*;base64,' + res[k].file,
                file_name: res[k].name,
              });
            }
          });
        this.getstudent();
      }
    });
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  check_add_user(data: any) {
    this.volunteerID = data.user_id;
  }

  data_for_checked() {
    for (let i = 0; i < this.contact_list.length; i++) {
      if (
        this.datapush.filter(
          (item) => item == this.contact_list[i].user_details.user_id
        ).length > 0
      ) {
        this.selection.toggle(this.contact_list[i]);
      }
    }
  }
  //popup select user category
  getstudent() {
    this._apiservice
      .getalluserscheckbox(this.country_code, this.customer_id,this.user_id)
      .subscribe((res) => {
        this.contact_list = res.data;
        this.data_for_checked();
      });
  }
  flr_user() {
    let api_data = this.datapush;
    let all_data: any[] = [];
    for (let i = 0; i < this.selection.selected.length; i++) {
      const element = this.selection.selected[i];
      all_data.push(element.user_details.user_id);
    }
    let flr = (user_id: any) => {
      for (let index = 0; index < api_data.length; index++) {
        if (api_data[index] == user_id) {
          return 0;
        }
      }
      return -1;
    };

    let data_for_insert: any[] = [];
    let data_for_skip: any[] = [];
    let data_for_remove: any[] = [];
    for (let i = 0; i < all_data.length; i++) {
      if (flr(all_data[i]) == -1) {
        data_for_insert.push(all_data[i]);
      }
      if (flr(all_data[i]) == 0) {
        data_for_skip.push(all_data[i]);
      }
    }
    let flr_for_delete = (user_id: any) => {
      for (let index = 0; index < data_for_skip.length; index++) {
        if (data_for_skip[index] == user_id) {
          return 0;
        }
      }
      return -1;
    };
    for (let i = 0; i < api_data.length; i++) {
      if (flr_for_delete(api_data[i]) == -1) {
        data_for_remove.push(api_data[i]);
      }
    }
    return {
      data_for_insert,
      data_for_remove,
    };
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
  handleImageError() {
    this.customer_image = null; // Set customer_image to null or assign another fallback value
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
  isButtonDisabled = false;

  disableButton() {
    this.isButtonDisabled = true;
  }
  gallery_c_file_id: any;
  updateeditphotovideo() {
    let name1: any = {
      activity_Data: this.firstFormGroup.controls['inputfield'].value,
    };
    let name = name1.activity_Data;
    let body: any = {
      country_code: this.country_code,
      customer_id: this.customer_id,
      gallery_file_uploaded_by_user_id: this.user_id,
      gallery_file_description: name,
    };
    this._apiservice.updateeditindphotovideo(body).subscribe((res) => {});
  }
  checkfile: any;
  showData1 = false;
  buttonDisabled = false;
  checkuploadfile(e: any) {
    this.checkfile = e;
    this.showData1 = true;
    this.showData = false;
    // if (e) {
    //   this.showData = !this.showData;

    // } else {
    //   this.showData = this.showData;
    //   this.showData1 = !this.showData1;
    // }

    this.buttonDisabled = true;
  }
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

  notallowed: boolean = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // File size in MB

    if (fileSize > 50) {
      this.notallowed = true;
      event.target.value = '';
    } else {
      this.notallowed = false;
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

  getsizecomvideo() {
    // this.showvid=true;
    const dialogRef = this.dialog.open(GetlargeImageComponent, {
      disableClose: false,
      height: 'auto',
      minWidth: '250px',
      width: 'auto',
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
  //Upload File
  onUploadFileCephStorage() {
    let formData: FormData = new FormData();
    formData.append('attachments', this.getFileUpload);
    formData.append('bucket_name', this.bucketName);
    formData.append('key', this.gallery_cloud_id_without_extension);

    let pushhh: any[] = [];
    // setTimeout(() => {
    for (let i = 0; i < this.selection.selected.length; i++) {
      const element = this.selection.selected[i];

      pushhh.push(element.user_details.user_id);
    }

    if (this.checkfile == 1) {
      console.log('upload with image');
      this._cephService.updateFile(formData).subscribe((res) => {
        this.gallery_c_file_id = res.data.cloud_file_id_with_extension;
        if (res?.statusCode == 200) {
          this._snackBarService.success(res.message);
          this.onNoClick();
        }
        let name1: any = {
          activity_Data: this.firstFormGroup.controls['inputfield'].value,
        };
        setTimeout(() => {
          this.flr_user();
        }, 500);
        let name = name1.activity_Data;
        let body: any = {
          country_code: this.country_code,
          customer_id: this.customer_id,
          gallery_file_uploaded_by_user_id: this.user_id,
          gallery_file_description: name,
          gallery_cloud_file_id: this.gallery_c_file_id,
          tagged_user_id: pushhh,
          ...this.flr_user(),
          gallery_file_upload_id: this.gallery_file_upload_id,
          removed_ids: this.users,
          video_duration_in_sec: this.duration,
        };

        this._apiservice.updateeditindphotovideo(body).subscribe((res) => {
          if (res.statusCode == 200) {
            this.onNoClick();
            this._snackbar.success(res.message);
          } else {
            this._snackbar.error(res.message);
          }
        });
        this.loginDialogRef.close({ event: true, data: 'true' });
      });
    } else {
      console.log('not upload without image');
      setTimeout(() => {
        this.flr_user();
      }, 500);
      let name1: any = {
        activity_Data: this.firstFormGroup.controls['inputfield'].value,
      };
      let name = name1.activity_Data;
      let body: any = {
        country_code: this.country_code,
        customer_id: this.customer_id,
        gallery_file_uploaded_by_user_id: this.user_id,
        gallery_file_description: name,
        gallery_cloud_file_id: this.gallery_c_file_id,
        gallery_file_upload_id: this.gallery_file_upload_id || this.gallery_file_upload_id_image,
        tagged_user_id: pushhh,
        ...this.flr_user(),
        video_duration_in_sec: this.duration,
      };

      this._apiservice.updateeditindphotovideo(body).subscribe((res) => {
        if (res.statusCode == 200) {
          this._snackbar.success(res.message);
          this.onNoClick();
        } else {
          this._snackbar.error(res.message);
        }
      });
      this.loginDialogRef.close({ event: true, data: 'true' });
    }
  }

  //* --------------------------  Public methods  --------------------------*//
  cantegory_name: any;

  searchWords: any;
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
  uniqueUsers: any;

  //check box select
  comment_id_get_id_first_reply: any;
  tableDatass: any;

  comment_user_details: any;
  userData: any[] = [];
  final: any;

  users: any[] = [];
  disablesavebtn: boolean = true;
  pushdataload: any[] = [];

  isrowselectedfirstreply(ev: any, e: any) {
    let pushhh: any[] = [];
    setTimeout(() => {
      for (let i = 0; i < this.selection.selected.length; i++) {
        const element = this.selection.selected[i];
        pushhh.push(element.user_details.user_id);
      }
    }, 300);
    // this.selection.select(e)

    if (e.length > 0) {
      this.disablesavebtn = true;
    } else {
      this.disablesavebtn = false;
    }

    this.comment_user_details = e.reply;

    const index = this.userData.findIndex(
      (x) => x == this.comment_user_details
    );
    if (index < 0) {
      this.userData.push({ reply: this.comment_user_details });
    } else {
      this.userData.splice(index, 1);
    }

    this.final = this.studentDatas.concat(...this.userData);
    this.uniqueUsers = uniqBy(this.final, 'reply.user_id');
    this.studentDatas = this.uniqueUsers;
    // this.data_for_checked();
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

  removeItem(index: number) {
    this.studentDatas?.splice(index, 1);
  }
  getremoveid(e: any) {}
  isVideoLoaded: any;
  getFileUpload: any;
  disablefileuploadimage: boolean = true;
  duration: any;
  time: any;
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

  //check box
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
    if (this.checkeduserid.length > 0) {
      this.disablesavebtn = false;
    } else {
      this.disablesavebtn = true;
    }
  }
  //! -------------------------------  End  --------------------------------!//
}
