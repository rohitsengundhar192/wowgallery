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
import { count } from 'rxjs';

@Component({
  selector: 'app-trim-video-popup',
  templateUrl: './trim-video-popup.component.html',
  styleUrls: ['./trim-video-popup.component.scss'],
})
export class TrimVideoPopupComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  pushtable: any[] = [];
  bucketName: any;
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
  formattedTime: any;
  video_duration_in_sec: any;
  whole_number_part: any;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<TrimVideoPopupComponent>,
    private _cephService: CephService,
    private _snackBarService: SnackBarService,
    public MatDialogRef: MatDialogRef<TrimVideoPopupComponent>,
    private fileService: FileserviceService,
    private authService: JwtauthserviceService,
    private _apiservice: ApiService,
    private _spinner: CustomSpinnerService,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  async ngOnInit(): Promise<void> {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id = token.user.user_id;
    this.bucketName = `${this.country_code}-${this.customer_id}`;
    console.log(this.bucketName);
    this.gallery_file_uploaded_by_user_id =
      this.data.gallery_file_uploaded_by_user_id;
    this.gallery_file_upload_datetime = this.data.gallery_file_upload_datetime;
    this.gallery_cloud_file_id = this.data.gallery_cloud_file_id;
    this.gallery_file_upload_id = this.data.gallery_file_upload_id;
    this.video_duration_in_sec = this.data.video_duration_in_sec;
    this.formattedTime = this.convertToTimeFormat(this.video_duration_in_sec);
    this.whole_number_part = Math.floor(this.video_duration_in_sec);
    console.log(this.whole_number_part);

    console.log(this.formattedTime, 'for');

    this.gallery_cloud_file_id = this.data.gallery_cloud_file_id;
    this.images = this.data.images;
    this.videofun();
    console.log(this.video, 'div');

    this.video = document.getElementById('video_editor') as HTMLVideoElement;
    this.video.src = this.video_url;
    this.getDuration();
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
  convertToTimeFormat(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const remainingSeconds = timeInSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.round(remainingSeconds % 60);

    const formattedTime = `${this.padZero(hours)}:${this.padZero(
      minutes
    )}:${this.padZero(seconds)}`;
    return formattedTime;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  //* ------------------------------ Helper Function -----------------------*//
  onNoClick(): void {
    this.loginDialogRef.close(true);
  }

  isVideoLoaded: any;
  getFileUpload: any;
  disablefileuploadimage: boolean = true;
  public browseVideo(event: any) {
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
    return this.video_url;
  };

  totalDuration: any;
  startTime: any;
  endTime: any;
  totaltime: any;

  startTime1: any;
  endTime1: any;

  videoStartTime1: any;
  videoEndTime1: any;
  video: any;

  ab: any;
  startT1: any;
  startT2: any;
  endT1: any;
  endT2: any;

  setclonef1s: any;
  setclonef1e: any;
  videoStartTime: any;
  videoEndTime: any;

  setclonef2s: any;
  setclonef2e: any;
  videoStartTime2: any;
  videoEndTime2: any;
  startT3: any;
  endT3: any;

  setclonef3s: any;
  setclonef3e: any;
  videoStartTime3: any;
  videoEndTime3: any;
  startT4: any;
  endT4: any;

  setclonef4s: any;
  setclonef4e: any;
  videoStartTime4: any;
  videoEndTime4: any;
  startT5: any;
  endT5: any;

  // temp variable
  videoElement: any;

  timeInSeconds: any;
  timeInSeconds1: any;

  first_s: any;
  first_e: any;
  sec_s: any;
  sec_e: any;
  third_s: any;
  third_e: any;
  fourth_s: any;
  fourth_e: any;
  five_s: any;
  five_e: any;

  async getDuration() {
    this.duration_in_seconds = await getBlobDuration(this.video_url);
    this.slider = document.getElementById('noUiSlider') as any;
    noUiSlider.create(this.slider, {
      start: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
      connect: [
        false,
        true,
        false,
        true,
        false,
        true,
        false,
        true,
        false,
        true,
        false,
      ],
      range: {
        min: 0,
        max: this.duration_in_seconds,
      },
    });

    let countf1s = 0;
    let countf1e = 0;
    let clone_start_time1: any;
    let clone_end_time1: any;

    let countf2s = 0;
    let countf2e = 0;
    let clone_start_time2: any;
    let clone_end_time2: any;

    let countf3s = 0;
    let countf3e = 0;
    let clone_start_time3: any;
    let clone_end_time3: any;

    let countf4s = 0;
    let countf4e = 0;
    let clone_start_time4: any;
    let clone_end_time4: any;

    let countf5s = 0;
    let countf5e = 0;
    let clone_start_time5: any;
    let clone_end_time5: any;

    this.slider.noUiSlider.on('update', (sliderValue: any) => {
      // console.log(sliderValue, 'sli');
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
      this.video.currentTime = sliderValue[1];
      let date2 = new Date(sliderValue[1] * 1000);
      let hh2 = date2.getUTCHours();
      let mm2 = date2.getUTCMinutes();
      let ss2 = date2.getUTCSeconds();
      this.endTime = `${hh2 < 10 ? '0' + hh2 : hh2}:${
        mm2 < 10 ? '0' + mm2 : mm2
      }:${ss2 < 10 ? '0' + ss2 : ss2}`;
      this.videoEndTime = this.endTime;

      // Second Range
      // Start Time format
      this.video.currentTime = sliderValue[2];
      let date3 = new Date(sliderValue[2] * 1000);
      let hh3 = date3.getUTCHours();
      let mm3 = date3.getUTCMinutes();
      let ss3 = date3.getUTCSeconds();
      this.startTime1 = `${hh3 < 10 ? '0' + hh3 : hh3}:${
        mm3 < 10 ? '0' + mm3 : mm3
      }:${ss3 < 10 ? '0' + ss3 : ss3}`;
      console.log(this.startTime1, 'f2-s');

      this.videoStartTime1 = this.startTime1;
      if (countf1s == 0) {
        clone_start_time1 = this.startTime1;
      }
      countf1s++;
      this.setclonef1s = clone_start_time1;
      // console.log(this.setclonef1s,'f2-s-clone');

      // End Time format
      this.video.currentTime = sliderValue[3];
      let date4 = new Date(sliderValue[3] * 1000);
      let hh4 = date4.getUTCHours();
      let mm4 = date4.getUTCMinutes();
      let ss4 = date4.getUTCSeconds();
      this.endTime1 = `${hh4 < 10 ? '0' + hh4 : hh4}:${
        mm4 < 10 ? '0' + mm4 : mm4
      }:${ss4 < 10 ? '0' + ss4 : ss4}`;
      this.videoEndTime1 = this.endTime1;
      // console.log(this.endTime1,'f2-e');

      if (countf1e == 0) {
        clone_end_time1 = this.endTime1;
      }
      countf1e++;
      this.setclonef1e = clone_end_time1;
      // console.log(this.setclonef1e,'f2-e-clone');

      // Third Range
      // Start Time format
      this.video.currentTime = sliderValue[4];
      let date5 = new Date(sliderValue[4] * 1000);
      let hh5 = date5.getUTCHours();
      let mm5 = date5.getUTCMinutes();
      let ss5 = date5.getUTCSeconds();
      this.startTime2 = `${hh5 < 10 ? '0' + hh5 : hh5}:${
        mm5 < 10 ? '0' + mm5 : mm5
      }:${ss5 < 10 ? '0' + ss5 : ss5}`;
      console.log(this.startTime2, 'f3-s');

      this.videoStartTime2 = this.startTime2;
      if (countf2s == 0) {
        clone_start_time2 = this.startTime2;
      }
      countf2s++;
      this.setclonef2s = clone_start_time2;
      // console.log(this.setclonef1s,'f2-s-clone');

      // End Time format
      this.video.currentTime = sliderValue[5];
      let date6 = new Date(sliderValue[5] * 1000);
      let hh6 = date6.getUTCHours();
      let mm6 = date6.getUTCMinutes();
      let ss6 = date6.getUTCSeconds();
      this.endTime2 = `${hh6 < 10 ? '0' + hh6 : hh6}:${
        mm6 < 10 ? '0' + mm6 : mm6
      }:${ss6 < 10 ? '0' + ss6 : ss6}`;
      this.videoEndTime2 = this.endTime2;
      // console.log(this.endTime1,'f2-e');

      if (countf2e == 0) {
        clone_end_time2 = this.endTime2;
      }
      countf2e++;
      this.setclonef2e = clone_end_time2;

      // Fourth Range
      // Start Time format
      this.video.currentTime = sliderValue[6];
      let date7 = new Date(sliderValue[6] * 1000);
      let hh7 = date7.getUTCHours();
      let mm7 = date7.getUTCMinutes();
      let ss7 = date7.getUTCSeconds();
      this.startTime3 = `${hh7 < 10 ? '0' + hh7 : hh7}:${
        mm7 < 10 ? '0' + mm7 : mm7
      }:${ss7 < 10 ? '0' + ss7 : ss7}`;
      this.videoStartTime3 = this.startTime3;
      if (countf3s == 0) {
        clone_start_time3 = this.startTime3;
      }
      countf3s++;
      // console.log(clone_start_time3, 'clone-f3-s');
      this.setclonef3s = clone_start_time3;

      // End Time format
      this.video.currentTime = sliderValue[7];
      let date8 = new Date(sliderValue[7] * 1000);
      let hh8 = date8.getUTCHours();
      let mm8 = date8.getUTCMinutes();
      let ss8 = date8.getUTCSeconds();
      this.endTime3 = `${hh8 < 10 ? '0' + hh8 : hh8}:${
        mm8 < 10 ? '0' + mm8 : mm8
      }:${ss8 < 10 ? '0' + ss8 : ss8}`;
      this.videoEndTime3 = this.endTime3;
      if (countf3e == 0) {
        clone_end_time3 = this.endTime3;
      }
      countf3e++;
      this.setclonef3e = clone_end_time3;

      // Fifth Range

      // Start Time format
      this.video.currentTime = sliderValue[8];
      let date9 = new Date(sliderValue[8] * 1000);
      let hh9 = date9.getUTCHours();
      let mm9 = date9.getUTCMinutes();
      let ss9 = date9.getUTCSeconds();
      this.startTime4 = `${hh9 < 10 ? '0' + hh9 : hh9}:${
        mm9 < 10 ? '0' + mm9 : mm9
      }:${ss9 < 10 ? '0' + ss9 : ss9}`;
      console.log(this.startTime4, 'f3-s');

      this.videoStartTime4 = this.startTime4;
      if (countf4s == 0) {
        clone_start_time4 = this.startTime4;
      }
      countf4s++;
      this.setclonef4s = clone_start_time4;

      // End Time format
      // this.video.currentTime = sliderValue[9];
      // let date10 = new Date(sliderValue[9] * 1000);
      // let hh10 = date10.getUTCHours();
      // let mm10 = date10.getUTCMinutes();
      // let ss10 = date10.getUTCSeconds();
      // this.endTime4 = `${hh10 < 10 ? '0' + hh10 : hh10}:${
      //   mm10 < 10 ? '0' + mm10 : mm10
      // }:${ss10 < 10 ? '0' + ss10 : ss10}`;
      // this.videoEndTime4 = this.endTime4;
      // if (countf4e == 0) {
      //   clone_end_time4 = this.endTime4;
      // }
      // countf4e++;
      // this.setclonef4e = clone_end_time4;
      // End Time format
      this.video.currentTime = sliderValue[9];
      let date10 = new Date(sliderValue[9] * 1000);
      let hh10 = date10.getUTCHours();
      let mm10 = date10.getUTCMinutes();
      let ss10 = date10.getUTCSeconds();
      this.endTime4 = `${hh10 < 10 ? '0' + hh10 : hh10}:${
        mm10 < 10 ? '0' + mm10 : mm10
      }:${ss10 < 10 ? '0' + ss10 : ss10}`;
      this.videoEndTime4 = this.endTime4;
      // console.log(this.endTime1,'f2-e');

      if (countf4e == 0) {
        clone_end_time4 = this.endTime4;
      }
      countf4e++;
      this.setclonef4e = clone_end_time4;

      //Another
      const s1 = parseFloat(sliderValue[0]);
      const e1 = parseFloat(sliderValue[1]);
      const s2 = parseFloat(sliderValue[2]);
      const e2 = parseFloat(sliderValue[3]);
      const s3 = parseFloat(sliderValue[4]);
      const e3 = parseFloat(sliderValue[5]);
      const s4 = parseFloat(sliderValue[6]);
      const e4 = parseFloat(sliderValue[7]);
      const s5 = parseFloat(sliderValue[8]);
      const e5 = parseFloat(sliderValue[9]);

      this.first_s = s1;
      this.first_e = e1;

      this.sec_s = s2;
      this.sec_e = e2;

      this.third_s = s3;
      this.third_e = e3;

      this.fourth_s = s4;
      this.fourth_e = e4;

      this.five_s = s5;
      this.five_e = e5;

      //get duration
      this.startT1 = new Date(`1970-01-01T${this.startTime}Z`);
      this.endT1 = new Date(`1970-01-01T${this.endTime}Z`);

      this.startT2 = new Date(`1970-01-01T${this.startTime1}Z`);
      this.endT2 = new Date(`1970-01-01T${this.endTime1}Z`);

      console.log(this.startT2);

      this.startT3 = new Date(`1970-01-01T${this.startTime2}Z`);
      this.endT3 = new Date(`1970-01-01T${this.endTime2}Z`);

      this.startT4 = new Date(`1970-01-01T${this.startTime3}Z`);
      this.endT4 = new Date(`1970-01-01T${this.endTime3}Z`);

      this.startT5 = new Date(`1970-01-01T${this.startTime4}Z`);
      this.endT5 = new Date(`1970-01-01T${this.endTime4}Z`);

      console.log(this.startT5);

      const duration1Seconds = (this.endT1 - this.startT1) / 1000;
      const duration2Seconds = (this.endT2 - this.startT2) / 1000;
      const duration3Seconds = (this.endT3 - this.startT3) / 1000;
      const duration4Seconds = (this.endT4 - this.startT4) / 1000;
      const duration5Seconds = (this.endT5 - this.startT5) / 1000;
      console.log(duration5Seconds);

      const totalDurationSeconds =
        duration1Seconds +
        duration2Seconds +
        duration3Seconds +
        duration4Seconds +
        duration5Seconds;
      console.log(totalDurationSeconds, 'to');
      this.totaltime = totalDurationSeconds;

      if (totalDurationSeconds < 11) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }

      this.playVideo(s1, e1, () => {
        this.playVideo(s2, e2, () => {
          this.playVideo(s3, e3, () => {
            this.playVideo(s4, e4, () => {
              this.playVideo(s5, e5, () => {
                console.log('Playback completed');
              });
            });
          });
        });
      });
    });
  }

  playVideo(startTime: number, endTime: number, callback: () => void) {
    const videoElement = document.getElementById(
      'video_editor'
    ) as HTMLVideoElement;
    videoElement.currentTime = startTime;
    videoElement.play();

    videoElement.ontimeupdate = () => {
      if (videoElement.currentTime >= endTime) {
        videoElement.pause();
        videoElement.ontimeupdate = null; // Remove the event listener
        callback(); // Call the callback function to continue with the next part
      }
    };
  }

  //-------------

  textareaValue!: string;

  editedVideoBlob: any;
  editedVideoBlobUrl: any;
  editedSrc: any;
  cutted_url: any;
  file: any;
  cutted_url1: any;
  cut: any;

  //-----------------------------second---------------------------------//
  editedVideoBlob1: any;
  editedVideoBlobUrl1: any;
  // editedVideoBlobUrl2: any;
  editedSrc1: any;
  editedBlob: any;
  editedBlobUrl: any;
  trimVideo() {
    // this._spinner.open();
    const ffmpeg = createFFmpeg({
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
      log: true,
    });

    (async () => {
      ffmpeg.load();
      setTimeout(async () => {
        ffmpeg.FS('writeFile', 'input', await fetchFile(this.video_url));

        await ffmpeg.run(
          '-i',
          'input',
          '-ss',
          this.startTime,
          '-to',
          this.endTime,
          '-c',
          'copy',
          'output1.mp4'
        );

        const Data = ffmpeg.FS('readFile', 'output1.mp4');
        const editedVideoBlob = new Blob([Data.buffer], { type: 'video/mp4' });
        const editedVideoBlobUrl = URL.createObjectURL(editedVideoBlob);
        this.editedVideoBlobUrl = editedVideoBlobUrl;
        ffmpeg.exit();
      }, 2000);
    })();
    this.isVideoLoaded = true;
  }

  trimVideo1() {
    // this._spinner.open();
    const ffmpeg = createFFmpeg({
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
      log: true,
    });

    (async () => {
      ffmpeg.load();
      setTimeout(async () => {
        ffmpeg.FS('writeFile', 'input', await fetchFile(this.video_url));

        await ffmpeg.run(
          '-i',
          'input',
          '-ss',
          this.startTime1,
          '-to',
          this.endTime1,
          '-c',
          'copy',
          'output2.mp4'
        );

        const Data = ffmpeg.FS('readFile', 'output2.mp4');
        const editedVideoBlob1 = new Blob([Data.buffer], { type: 'video/mp4' });
        const editedVideoBlobUrl1 = URL.createObjectURL(editedVideoBlob1);
        this.editedVideoBlobUrl1 = editedVideoBlobUrl1;
        ffmpeg.exit();
      }, 2000);
    })();

    this.isVideoLoaded = true;
  }

  startTime2: any;
  endTime2: any;
  editedVideoBlobUrl2: any;

  trimVideo2() {
    // this._spinner.open();
    const ffmpeg = createFFmpeg({
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
      log: true,
    });

    (async () => {
      ffmpeg.load();
      setTimeout(async () => {
        ffmpeg.FS('writeFile', 'input', await fetchFile(this.video_url));

        await ffmpeg.run(
          '-i',
          'input',
          '-ss',
          this.startTime2,
          '-to',
          this.endTime2,
          '-c',
          'copy',
          'output3.mp4'
        );

        const Data = ffmpeg.FS('readFile', 'output3.mp4');
        const editedVideoBlob2 = new Blob([Data.buffer], { type: 'video/mp4' });
        const editedVideoBlobUrl2 = URL.createObjectURL(editedVideoBlob2);
        this.editedVideoBlobUrl2 = editedVideoBlobUrl2;
        ffmpeg.exit();
      }, 2000);
    })();

    this.isVideoLoaded = true;
  }

  startTime3: any;
  endTime3: any;
  editedVideoBlobUrl3: any;
  trimVideo3() {
    // this._spinner.open();
    const ffmpeg = createFFmpeg({
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
      log: true,
    });

    (async () => {
      ffmpeg.load();
      setTimeout(async () => {
        ffmpeg.FS('writeFile', 'input', await fetchFile(this.video_url));

        await ffmpeg.run(
          '-i',
          'input',
          '-ss',
          this.startTime3,
          '-to',
          this.endTime3,
          '-c',
          'copy',
          'output4.mp4'
        );

        const Data = ffmpeg.FS('readFile', 'output4.mp4');
        const editedVideoBlob3 = new Blob([Data.buffer], { type: 'video/mp4' });
        const editedVideoBlobUrl3 = URL.createObjectURL(editedVideoBlob3);
        this.editedVideoBlobUrl3 = editedVideoBlobUrl3;
        ffmpeg.exit();
      }, 2000);
    })();

    this.isVideoLoaded = true;
  }
  startTime4: any;
  endTime4: any;
  editedVideoBlobUrl4: any;
  trimVideo4() {
    // this._spinner.open();
    const ffmpeg = createFFmpeg({
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
      log: true,
    });

    (async () => {
      ffmpeg.load();
      setTimeout(async () => {
        ffmpeg.FS('writeFile', 'input', await fetchFile(this.video_url));

        await ffmpeg.run(
          '-i',
          'input',
          '-ss',
          this.startTime4,
          '-to',
          this.endTime4,
          '-c',
          'copy',
          'output5.mp4'
        );

        const Data = ffmpeg.FS('readFile', 'output5.mp4');
        const editedVideoBlob4 = new Blob([Data.buffer], { type: 'video/mp4' });
        const editedVideoBlobUrl4 = URL.createObjectURL(editedVideoBlob4);
        this.editedVideoBlobUrl4 = editedVideoBlobUrl4;
        ffmpeg.exit();
      }, 2000);
    })();

    this.isVideoLoaded = true;
  }

  onButtonClickd() {
    //2
    let initialStartTime1 = this.startTime1;
    let initialEndTime1 = this.endTime1;
    let ch01 = this.setclonef1s;
    let ch001 = this.setclonef1e;
    // console.log(initialStartTime1, initialEndTime1, 'first');
    // console.log(ch01, ch001, 'first clone');

    //3
    let initialStartTime2 = this.startTime2;
    let initialEndTime2 = this.endTime2;
    let ch02 = this.setclonef2s;
    let ch002 = this.setclonef2e;
    console.log(initialStartTime2, initialEndTime2, 'secnd');
    console.log(ch02, ch002, 'secnd clone');
    //4
    let initialStartTime3 = this.startTime3;
    let initialEndTime3 = this.endTime3;
    let ch03 = this.setclonef3s;
    let ch003 = this.setclonef3e;
    // console.log(initialStartTime3, initialEndTime3, 'third');
    // console.log(ch03, ch003, 'third clone');

    //5
    let initialStartTime4 = this.startTime4;
    let initialEndTime4 = this.endTime4;
    let ch04 = this.setclonef4s;
    let ch004 = this.setclonef4e;
    // console.log(initialStartTime4, initialEndTime4, 'fourth');
    // console.log(ch04, ch004, 'fourth clone');

    if (
      (initialStartTime1 !== ch01 || initialEndTime1 !== ch001) &&
      (initialStartTime2 !== ch02 || initialEndTime2 !== ch002) &&
      (initialStartTime3 !== ch03 || initialEndTime3 !== ch003) &&
      (initialStartTime4 !== ch04 || initialEndTime4 !== ch004)
    ) {
      this.trimVideo();
      this.trimVideo1();
      this.trimVideo2();
      this.trimVideo3();
      this.trimVideo4();
      setTimeout(() => {
        this.mergeVideosfive(
          this.editedVideoBlobUrl,
          this.editedVideoBlobUrl1,
          this.editedVideoBlobUrl2,
          this.editedVideoBlobUrl3,
          this.editedVideoBlobUrl4
        );
      }, 9000);
      console.log('Second and third and fouth and fivth ranges have changed.');
    } else if (
      (initialStartTime1 !== ch01 || initialEndTime1 !== ch001) &&
      (initialStartTime2 !== ch02 || initialEndTime2 !== ch002) &&
      (initialStartTime3 !== ch03 || initialEndTime3 !== ch003)
    ) {
      this.trimVideo();
      this.trimVideo1();
      this.trimVideo2();
      this.trimVideo3();
      setTimeout(() => {
        this.mergeVideosfour(
          this.editedVideoBlobUrl,
          this.editedVideoBlobUrl1,
          this.editedVideoBlobUrl2,
          this.editedVideoBlobUrl3
        );
      }, 5000);
      console.log('Second and third and fouth ranges have changed.');
    } else if (
      (initialStartTime1 !== ch01 || initialEndTime1 !== ch001) &&
      (initialStartTime2 !== ch02 || initialEndTime2 !== ch002)
    ) {
      this.trimVideo();
      this.trimVideo1();
      this.trimVideo2();

      setTimeout(() => {
        this.mergeVideosthree(
          this.editedVideoBlobUrl,
          this.editedVideoBlobUrl1,
          this.editedVideoBlobUrl2
        );
        console.log(
          this.editedVideoBlobUrl,
          this.editedVideoBlobUrl1,
          this.editedVideoBlobUrl2
        );
      }, 5000);
      console.log('Second and third ranges have changed.');
    } else if (initialStartTime1 !== ch01 || initialEndTime1 !== ch001) {
      this.trimVideo();
      this.trimVideo1();

      setTimeout(() => {
        this.mergeVideostwo(this.editedVideoBlobUrl, this.editedVideoBlobUrl1);
        console.log(this.editedVideoBlobUrl, this.editedVideoBlobUrl1);
      }, 5000);
      console.log('Second range have changed.');
    } else {
      this.trimVideoone();
      console.log(
        'First range has changed, while second and third ranges remain unchanged.'
      );
    }
  }

  //merger videos
  mergedVideoBlobUrl: any;

  //if one url

  trimVideoone() {
    this._spinner.open();
    try {
      const ffmpeg = createFFmpeg({
        mainName: 'main',
        corePath:
          'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
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
          // console.log(this.editedVideoBlobUrl);

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
              // console.log('Converted file:', this.file);
              if (this.file) {
                this._spinner.close();
                // this.onUploadFileCephStorage();
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
    } catch (error) {
      this._snackBarService.success('Internet Connection was Slow');
      this._spinner.close();
    }
  }
  //if two url
  async mergeVideostwo(editedVideoBlobUrl: Blob, editedVideoBlobUrl1: Blob) {
    this._spinner.open();
    try {
      const ffmpeg = createFFmpeg({
        mainName: 'main',
        corePath:
          'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
        log: true,
      });
      await ffmpeg.load();

      // write the input files
      ffmpeg.FS('writeFile', 'input1.mp4', await fetchFile(editedVideoBlobUrl));
      ffmpeg.FS(
        'writeFile',
        'input2.mp4',
        await fetchFile(editedVideoBlobUrl1)
      );

      // concatenate the input files
      await ffmpeg.run(
        '-i',
        'input1.mp4',
        '-i',
        'input2.mp4',
        '-filter_complex',
        '[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[outv][outa]',
        '-map',
        '[outv]',
        '-map',
        '[outa]',
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-movflags',
        '+faststart',
        'ou.mp4'
      );

      // read the output file and create a blob URL

      const Data = ffmpeg.FS('readFile', 'ou.mp4');

      this.editedVideoBlob = new Blob([Data.buffer], { type: 'video/mp4' });
      this.editedVideoBlobUrl = URL.createObjectURL(
        new Blob([Data.buffer], { type: 'video/mp4' })
      );
      this.editedSrc = document.getElementById(
        'video_editor'
      ) as HTMLVideoElement;
      this.editedSrc.onloadeddata = (e: any) => {
        this.cutted_url = this.editedSrc.src;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.cutted_url, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
          const blob = xhr.response;
          this.file = new File([blob], 'video.mp4', { type: blob.type });
          if (this.file) {
            this._spinner.close();
            // this.onUploadFileCephStorage();
          }
        };
        xhr.send();
      };
      this.editedSrc.src = this.editedVideoBlobUrl;
      ffmpeg.exit();
    } catch (error) {
      console.log(error);
      this._snackBarService.success('Internet Connection was Slow');
      this._spinner.close();
      this.onNoClick();
    }
  }
  // //if three url used
  async mergeVideosthree(
    editedVideoBlobUrl: Blob,
    editedVideoBlobUrl1: Blob,
    editedVideoBlobUrl2: Blob
  ) {
    this._spinner.open();

    try {
      const ffmpeg = createFFmpeg({
        mainName: 'main',
        corePath:
          'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
        log: true,
      });
      await ffmpeg.load();

      // Write the input files
      ffmpeg.FS('writeFile', 'input1.mp4', await fetchFile(editedVideoBlobUrl));
      ffmpeg.FS(
        'writeFile',
        'input2.mp4',
        await fetchFile(editedVideoBlobUrl1)
      );
      ffmpeg.FS(
        'writeFile',
        'input3.mp4',
        await fetchFile(editedVideoBlobUrl2)
      );
      console.log(
        'ii',
        editedVideoBlobUrl,
        'ii',
        editedVideoBlobUrl1,
        'ii',
        editedVideoBlobUrl2
      );

      // Concatenate the input files
      await ffmpeg.run(
        '-i',
        'input1.mp4',
        '-i',
        'input2.mp4',
        '-i',
        'input3.mp4',
        '-filter_complex',
        '[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[outv][outa]',
        '-map',
        '[outv]',
        '-map',
        '[outa]',
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-movflags',
        '+faststart',
        'ou.mp4'
      );

      // read the output file and create a blob URL

      const Data = ffmpeg.FS('readFile', 'ou.mp4');
      this.editedVideoBlob = new Blob([Data.buffer], { type: 'video/mp4' });
      this.editedVideoBlobUrl = URL.createObjectURL(
        new Blob([Data.buffer], { type: 'video/mp4' })
      );
      this.editedSrc = document.getElementById(
        'video_editor'
      ) as HTMLVideoElement;
      this.editedSrc.onloadeddata = (e: any) => {
        this.cutted_url = this.editedSrc.src;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.cutted_url, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
          const blob = xhr.response;
          this.file = new File([blob], 'video.mp4', { type: blob.type });
          if (this.file) {
            this._spinner.close();
            // this.onUploadFileCephStorage();
          }
        };
        xhr.send();
      };
      this.editedSrc.src = this.editedVideoBlobUrl;
      ffmpeg.exit();
    } catch (error) {
      this._snackBarService.success('Internet Connection was Slow');
      this._spinner.close();
      this.onNoClick();
    }
  }

  //if four url used
  async mergeVideosfour(
    editedVideoBlobUrl: Blob,
    editedVideoBlobUrl1: Blob,
    editedVideoBlobUrl2: Blob,
    editedVideoBlobUrl3: Blob
  ) {
    this._spinner.open();
    try {
      const ffmpeg = createFFmpeg({
        mainName: 'main',
        corePath:
          'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
        log: true,
      });
      await ffmpeg.load();
      // Write the input files
      ffmpeg.FS('writeFile', 'input1.mp4', await fetchFile(editedVideoBlobUrl));
      ffmpeg.FS(
        'writeFile',
        'input2.mp4',
        await fetchFile(editedVideoBlobUrl1)
      );
      ffmpeg.FS(
        'writeFile',
        'input3.mp4',
        await fetchFile(editedVideoBlobUrl2)
      );
      ffmpeg.FS(
        'writeFile',
        'input4.mp4',
        await fetchFile(editedVideoBlobUrl3)
      );
      console.log(
        'ii',
        editedVideoBlobUrl,
        'ii',
        editedVideoBlobUrl1,
        'ii',
        editedVideoBlobUrl2,
        'iii',
        editedVideoBlobUrl3
      );

      // Concatenate the input files
      await ffmpeg.run(
        '-i',
        'input1.mp4',
        '-i',
        'input2.mp4',
        '-i',
        'input3.mp4',
        '-i',
        'input4.mp4',
        '-filter_complex',
        '[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a]concat=n=4:v=1:a=1[outv][outa]',
        '-map',
        '[outv]',
        '-map',
        '[outa]',
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-movflags',
        '+faststart',
        'ou.mp4'
      );

      // read the output file and create a blob URL

      const Data = ffmpeg.FS('readFile', 'ou.mp4');
      console.log(Data.length, 'data');

      this.editedVideoBlob = new Blob([Data.buffer], { type: 'video/mp4' });
      this.editedVideoBlobUrl = URL.createObjectURL(
        new Blob([Data.buffer], { type: 'video/mp4' })
      );
      this.editedSrc = document.getElementById(
        'video_editor'
      ) as HTMLVideoElement;
      this.editedSrc.onloadeddata = (e: any) => {
        this.cutted_url = this.editedSrc.src;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.cutted_url, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
          const blob = xhr.response;
          this.file = new File([blob], 'video.mp4', { type: blob.type });
          if (this.file) {
            this._spinner.close();
            // this.onUploadFileCephStorage();
          }
        };
        xhr.send();
      };
      this.editedSrc.src = this.editedVideoBlobUrl;
      ffmpeg.exit();
    } catch (error) {
      this._snackBarService.success('Internet Connection was Slow');
      this._spinner.close();
      this.onNoClick();
    }
  }
  //if five url used
  async mergeVideosfive(
    editedVideoBlobUrl: Blob,
    editedVideoBlobUrl1: Blob,
    editedVideoBlobUrl2: Blob,
    editedVideoBlobUrl3: Blob,
    editedVideoBlobUrl4: Blob
  ) {
    this._spinner.open();

    try {
      const ffmpeg = createFFmpeg({
        mainName: 'main',
        corePath:
          'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
        log: true,
      });
      await ffmpeg.load();
      // Write the input files
      ffmpeg.FS('writeFile', 'input1.mp4', await fetchFile(editedVideoBlobUrl));
      ffmpeg.FS(
        'writeFile',
        'input2.mp4',
        await fetchFile(editedVideoBlobUrl1)
      );
      ffmpeg.FS(
        'writeFile',
        'input3.mp4',
        await fetchFile(editedVideoBlobUrl2)
      );
      ffmpeg.FS(
        'writeFile',
        'input4.mp4',
        await fetchFile(editedVideoBlobUrl3)
      );
      ffmpeg.FS(
        'writeFile',
        'input5.mp4',
        await fetchFile(editedVideoBlobUrl4)
      );
      console.log(
        'ii',
        editedVideoBlobUrl,
        'ii',
        editedVideoBlobUrl1,
        'ii',
        editedVideoBlobUrl2,
        'iii',
        editedVideoBlobUrl3,
        'iii',
        editedVideoBlobUrl4
      );
      // Concatenate the input files
      await ffmpeg.run(
        '-i',
        'input1.mp4',
        '-i',
        'input2.mp4',
        '-i',
        'input3.mp4',
        '-i',
        'input4.mp4',
        '-i',
        'input5.mp4',
        '-filter_complex',
        '[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a][4:v][4:a]concat=n=5:v=1:a=1[outv][outa]',
        '-map',
        '[outv]',
        '-map',
        '[outa]',
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-movflags',
        '+faststart',
        'ou.mp4'
      );

      // read the output file and create a blob URL

      const Data = ffmpeg.FS('readFile', 'ou.mp4');

      console.log(Data, 'data');

      this.editedVideoBlob = new Blob([Data.buffer], { type: 'video/mp4' });
      this.editedVideoBlobUrl = URL.createObjectURL(
        new Blob([Data.buffer], { type: 'video/mp4' })
      );
      this.editedSrc = document.getElementById(
        'video_editor'
      ) as HTMLVideoElement;
      this.editedSrc.onloadeddata = (e: any) => {
        this.cutted_url = this.editedSrc.src;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.cutted_url, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
          const blob = xhr.response;
          this.file = new File([blob], 'video.mp4', { type: blob.type });
          if (this.file) {
            this._spinner.close();
            // this.onUploadFileCephStorage();
          }
        };
        xhr.send();
      };
      this.editedSrc.src = this.editedVideoBlobUrl;
      ffmpeg.exit();
    } catch (error) {
      this._snackBarService.success('Internet Connection was Slow');
      this._spinner.close();
      this.onNoClick();
    }
  }

  //Upload File
  gallery_c_file_id: any;
  onUploadFileCephStorage() {
    let formData: FormData = new FormData();
    formData.append('attachments', this.file);
    formData.append('bucket_name', this.bucketName);
    formData.append('file_name', 'test');
    formData.append('is_private', 'false');
    formData.append('uploaded_created_via_app_id', '32');
    formData.append('is_uploaded_created_via_customapp', 'false');
    this._cephService.createFile(formData).subscribe((res) => {
      this.gallery_c_file_id = res.data.file_cloud_storage_path;
      if (res?.statusCode == 200) {
        this._snackBarService.success(res.message);
      }

      let body: any = {
        country_code: this.country_code,
        customer_id: this.customer_id,
        is_trimmed_from_cloud_file_id: this.gallery_c_file_id,
        login_id: this.user_id,
        gallery_file_upload_id: this.gallery_file_upload_id,
      };
      this._apiservice.updatetrimvideo(body).subscribe((res) => {
        if (res.statusCode == 200) {
          this._snackBarService.success(res.message);


        } else {
          this._snackBarService.error(res.message);
        }
      });
      this.loginDialogRef.close({event:true, data:"true"})

    });
  }
  buttonDisabled: boolean = false;

  disablesavebtn: boolean = true;
  savebtndis: any;
  onButtonClick(e: any) {
    this.savebtndis = e;

    if (this.savebtndis == 1) {
      this.disablesavebtn = false;
    } else {
      this.disablesavebtn = true;
    }
    this.buttonDisabled = true;
  }
  //! -------------------------------  End  --------------------------------!//
}
