import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import getBlobDuration from 'get-blob-duration';
import { CephService } from 'src/app/shared/services/ceph/ceph.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import * as noUiSlider from 'nouislider';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { FileserviceService } from '../../../../shared/services/blob/fileservice.service';
import { JwtauthserviceService } from 'src/app/shared/services/api/jwtauthservice.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit  {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  pushtable: any[] = [];
  bucketName: any = 'in-9';
  gallery_cloud_file_id: any;
  duration_in_seconds: any;
  images: any;
  slider: any;
  video_url: any;
  country_code: any;
  customer_id: any;
  user_id: any;
  studentDatas: any;
  gallery_file_upload_id: any;
  gallery_file_uploaded_by_user_id: any;
  gallery_file_upload_datetime: any;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<TestingComponent>,
    private _cephService: CephService,
    private _snackBarService: SnackBarService,
    public MatDialogRef: MatDialogRef<TestingComponent>,
    private fileService: FileserviceService,
    private authService: JwtauthserviceService,
    private _apiservice: ApiService,
    private _spinner:CustomSpinnerService,
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

    this.gallery_file_uploaded_by_user_id =
      this.data.gallery_file_uploaded_by_user_id;
    this.gallery_file_upload_datetime = this.data.gallery_file_upload_datetime;
    this.gallery_cloud_file_id = this.data.gallery_cloud_file_id;
    this.gallery_file_upload_id = this.data.gallery_file_upload_id;

    this.gallery_cloud_file_id = this.data.gallery_cloud_file_id;
    this.images = this.data.images; // console.log(this.images);
    this.videofun();
    this.video = document.getElementById('video_editor') as HTMLVideoElement;
    this.video.src = this.video_url;

    this.getDuration();

    //image to show
    this._cephService
      .getFileMultipleFilesBasedOnKey(
        this.bucketName,
        this.gallery_cloud_file_id
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
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  //Upload File
  // gallery_c_file_id: any;
  // onUploadFileCephStorage() {
  //   let formData: FormData = new FormData();
  //   formData.append('attachments', this.getFileUpload);
  //   formData.append('bucket_name', 'in-9');
  //   formData.append('key', this.gallery_cloud_file_id);

  //   this._cephService.updateFile(formData).subscribe((res) => {
  //     console.log('res', res);
  //     this.gallery_c_file_id = res.data.cloud_file_id;
  //     if (res?.statusCode == 200) {
  //       this._snackBarService.success(res.message);
  //     }
  //   });
  // }
  //* ------------------------------ Helper Function -----------------------*//
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  buttonDisabled = false;

  disablesavebtn: boolean = true;
  savebtndis: any;
  onButtonClick(e: any) {
    this.savebtndis = e;

    if (this.savebtndis == 1) {
      this.disablesavebtn = false;
    } else {
      this.disablesavebtn = true;
    }

    // disable the button after it has been clicked
    this.buttonDisabled = true;
    // do whatever action you want to do on button click
  }

  isVideoLoaded: any;
  getFileUpload: any;
  disablefileuploadimage: boolean = true;
  public browseVideo(event: any) {
    console.log(event.target.files.length, 'e');

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
  //Trim

  videofun = () => {
    //mine
    const base64Url = this.images;
    const matches: any = base64Url.match(/^data:(.+);base64,(.*)$/);
    if (matches.length !== 3) {
      throw new Error('Invalid Base64 URL link');
    }
    const contentType = matches[1];
    const base64Data = matches[2];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'video/mp4' });
    const blobUrl = URL.createObjectURL(blob);
    this.video_url = blobUrl;

    console.log(this.video_url);
    return this.video_url;
  };

  totalDuration: any;
  startTime: any;
  endTime: any;
  videoStartTime: any;
  videoEndTime: any;
  video: any;
  ab: any;

  // temp variable
  videoElement: any;
  async getDuration() {
    // noUiSlider
    this.duration_in_seconds = await getBlobDuration(this.video_url);
    this.slider = document.getElementById('noUiSlider') as any;
    noUiSlider.create(this.slider, {
      start: [0, 10],
      connect: true,
      behaviour: 'drag-fixed',
      range: {
        min: 0,
        max: this.duration_in_seconds,
      },
    });

    this.slider.noUiSlider.on('change.one', (sliderValue: any) => {
      console.log('change event called');

      // Start Time format
      // console.log(this.video);
      // console.log(this.video.currentTime);
      // console.log(this.video_url);
      // console.log(this.video_url.currentTime);

      console.log(sliderValue);
      this.video.currentTime = sliderValue[0];
      // console.log(this.video.currentTime);

      let date1 = new Date(sliderValue[0] * 1000);
      let hh1 = date1.getUTCHours();
      let mm1 = date1.getUTCMinutes();
      let ss1 = date1.getUTCSeconds();
      this.startTime = `${hh1 < 10 ? '0' + hh1 : hh1}:${
        mm1 < 10 ? '0' + mm1 : mm1
      }:${ss1 < 10 ? '0' + ss1 : ss1}`;
      // console.log(this.startTime);

      // End Time format
      let date2 = new Date(sliderValue[1] * 1000);
      let hh2 = date2.getUTCHours();
      let mm2 = date2.getUTCMinutes();
      let ss2 = date2.getUTCSeconds();
      this.endTime = `${hh2 < 10 ? '0' + hh2 : hh2}:${
        mm2 < 10 ? '0' + mm2 : mm2
      }:${ss2 < 10 ? '0' + ss2 : ss2}`;
    });
    this.slider.noUiSlider.on('update', (sliderValue: any) => {
      console.log('update event called');

      // Start Time format
      this.video.currentTime = sliderValue[0];
      let date1 = new Date(sliderValue[0] * 1000);
      let hh1 = date1.getUTCHours();
      let mm1 = date1.getUTCMinutes();
      let ss1 = date1.getUTCSeconds();
      this.startTime = `${hh1 < 10 ? '0' + hh1 : hh1}:${
        mm1 < 10 ? '0' + mm1 : mm1
      }:${ss1 < 10 ? '0' + ss1 : ss1}`;
      this.videoStartTime = this.startTime;
      // End Time format
      let date2 = new Date(sliderValue[1] * 1000);
      let hh2 = date2.getUTCHours();
      let mm2 = date2.getUTCMinutes();
      let ss2 = date2.getUTCSeconds();
      this.endTime = `${hh2 < 10 ? '0' + hh2 : hh2}:${
        mm2 < 10 ? '0' + mm2 : mm2
      }:${ss2 < 10 ? '0' + ss2 : ss2}`;
      this.videoEndTime = this.endTime;

      //hh:mm:ss to seconds
      let timeArray = this.endTime.split(':');
      let hours = parseInt(timeArray[0]);
      let minutes = parseInt(timeArray[1]);
      let seconds = parseInt(timeArray[2]);
      let timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      videoControl(this.startTime, timeInSeconds);
    });
    this.video.currentTime = this.startTime;
    function videoControl(start: any, end: any) {
      let videoElement = document.getElementById(
        'video_editor'
      ) as HTMLVideoElement;
      // console.log(videoElement);

      // videoElement.src = ;
      videoElement.ontimeupdate = function () {
        if (videoElement.currentTime >= end) {
          videoElement.pause();
        }
      };
    }
  }
  //  onFileSelected(event: any) {
  //   console.log(event);

  //   // const selectedFile = event.target.files[0];

  //   // // Use the FileService to convert the selected file to a File object
  //   const file = this.fileService.blobToFile();
  //   // console.log(file,'file');

  //   // const response = await fetch(this.video_url);
  //   // const blob = await response.blob();

  //   // Convert the Blob to a File object using the FileService
  //   // const file = this.fileService.blobToFile(blob, 'my-video.mp4');

  //   // Use the resulting File object as needed
  // }

  downloadFile() {}

  editedVideoBlob: any;
  editedVideoBlobUrl: any;
  editedSrc: any;
  cutted_url: any;
  file: any;
  trimVideo() {

    this._spinner.open();
    const ffmpeg = createFFmpeg({
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
      log: true,
    });
    (async () => {
      ffmpeg.load();
      setTimeout(async () => {
        // let video = 'http://media.w3.org/2010/05/sintel/trailer.mp4';
        ffmpeg.FS('writeFile', 'input', await fetchFile(this.video_url));
        await ffmpeg.run(
          '-i',
          'input',
          '-ss',
          this.videoStartTime,
          '-to',
          this.videoEndTime,
          'output.mp4'
        );
        const Data = ffmpeg.FS('readFile', 'output.mp4');
        // console.log(Data);

        // this.downloadFile();

        this.editedVideoBlob = new Blob([Data.buffer], { type: 'video/mp4' });
        this.editedVideoBlobUrl = URL.createObjectURL(
          new Blob([Data.buffer], { type: 'video/mp4' })
        );
        console.log(this.editedVideoBlobUrl);

        this.editedSrc = document.getElementById(
          'video_editor'
        ) as HTMLVideoElement;
        // console.log(this.editedSrc.src)
        this.editedSrc.onloadeddata = (e: any) => {
          // console.log('load',e,this.editedSrc.src)
          this.cutted_url = this.editedSrc.src;

          const xhr = new XMLHttpRequest();
          xhr.open('GET', this.cutted_url, true);
          xhr.responseType = 'blob';

          xhr.onload = () => {
            const blob = xhr.response;
            this.file = new File([blob], 'video.mp4', { type: blob.type });
            console.log('Converted file:', this.file);
            if (this.file) {
              this._spinner.close();
            }
          };

          xhr.send();
        };
        // console.log(this.cutted_url,'ct');

        this.editedSrc.src = this.editedVideoBlobUrl;
        ffmpeg.exit();
      }, 2000);
    })();

    this.isVideoLoaded = true;
  }

  //Upload File
  gallery_c_file_id: any;
  onUploadFileCephStorage() {
    let formData: FormData = new FormData();
    formData.append('attachments', this.file);
    formData.append('bucket_name', 'in-9');
    formData.append('file_name', 'test');
    formData.append('is_private', 'false');
    formData.append('uploaded_created_via_app_id', '32');
    formData.append('is_uploaded_created_via_customapp', 'false');
    // formData.append('key', key);
    // this.loader.open();

    this._cephService.createFile(formData).subscribe((res) => {
      console.log('res', res);
      this.gallery_c_file_id = res.data.file_cloud_storage_path;
      if (res?.statusCode == 200) {
        // this.loader.close();

        this._snackBarService.success(res.message);
      }

      let body: any = {
        country_code: this.country_code,
        customer_id: this.customer_id,
        is_trimmed_from_cloud_file_id: this.gallery_c_file_id,
        login_id: this.user_id,
        gallery_file_upload_id: this.gallery_file_upload_id,
      };
      console.log(body, 'body');

      this._apiservice.updatetrimvideo(body).subscribe((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          this._snackBarService.success(res.message);
          this.onNoClick();
        } else {
          this._snackBarService.error(res.message);
        }
      });
    });
  }
  //! -------------------------------  End  --------------------------------!//
}
