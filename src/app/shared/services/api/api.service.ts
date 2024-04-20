import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtauthserviceService } from './jwtauthservice.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private _jwtAuthService: JwtauthserviceService
  ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  getvalues() {
    this.customer_id = localStorage.getItem('customer_id');
    this.country_no = localStorage.getItem('country_no');
  }

  parent_child_select(
    country_code: string,
    customer_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getallusersnewinstutionalvidphotos}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Institutional Photos/Videos
  getalluserscheckbox(
    country_code: string,
    customer_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getallusersnewinstutionalvidphotos}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getalluserscheckboxedit(
    country_code: string,
    customer_id: number,
    user_id_not: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getallusersnewinstutionalvidphotosedit}?country_code=${country_code}&customer_id=${customer_id}&user_id_not=${user_id_not}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //get login user details
  getloginuserdetails(
    country_code: string,
    customer_id: number,
    user_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getloginuserdetails}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get uploaded datetime
  getuploadeddatetime(): Observable<any> {
    return this.http.get<any>(
      `${environment.getuploadeddatetime}?`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get tagged user details
  gettaggeduserdetails(
    country_code: any,
    customer_id: number,
    gallery_file_upload_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.gettaggeduserdetails}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_upload_id=${gallery_file_upload_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update is_enabled_for_app_and_getster_screen_display
  updateenableforwowscreen(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateis_enabled_for_wow_screen_display}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  updateenableforwowscreeninsart(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateenabledisablewowscreendefualtimgart}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }
  updateenableforwowscreenimgvid(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateenabledisablewowscreendefualtimgvid}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }
  updateenableforwowscreentour(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateenabledisablewowscreendefualttour}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update is_enabled_for_app_and_getster_screen_display
  updatetrimvideo(body: any): Observable<any> {
    return this.http.post(
      `${environment.updatetrim_video}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }
  updateeditindphotovideo(body: any): Observable<any> {
    return this.http.post(
      `${environment.update_edit_ind_vid_phot}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }
  //delete
  deleteuserid(
    country_code: any,
    customer_id: number,
    gallery_file_upload_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.delete_file}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_uploaded_id=${gallery_file_upload_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Audit trail
  AuditTrail(page_no: number, page_per: number) {
    return this.http.get<any>(
      `${environment.audit_trail}?page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //used category
  //insert institutional photos and videos

  saveinsert(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.insertinstitutionalphovid}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get uploaded images
  getuploadedimages(
    country_code: any,
    customer_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getuploadedimage}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get uploaded images
  getalldataindphovid(
    country_code: any,
    customer_id: number,
    gallery_file_category: number,
    page_no: number,
    page_per: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalldatatableindusphovid}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Wow scrren defualt image and videos -------------------------------

  // getalltablewowscreendefualtimgvid(
  //   country_code: any,
  //   customer_id: number,
  //   user_id: number
  // ): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.getalltablewowscreendefualtimgvid}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}`,
  //     this._jwtAuthService.getJwtToken()
  //   );
  // }

  getalltablewowscreendefualtimgvid(
    country_code: any,
    customer_id: number,
    user_id: number,
    page_no: number,
    page_per: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalltablewowscreendefualtimgvid}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update is_enabled_for_app_and_getster_screen_display
  updateenableforwowscreendefualt(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateenabledisablewowscreendefualt}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //----------------------------------------------------------------------------------------------------------

  //Instutitional art and images
  saveinsertinsart(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.insertinstitutionalphovidinsart}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get uploaded images
  getuploadedimagesinsart(
    country_code: any,
    customer_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getuploadedimageinsart}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //get uploaded images
  getalldataindphovidinsart(
    country_code: any,
    customer_id: number,
    gallery_file_category: number,
    page_no: number,
    page_per: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalldatatableindusphovidinsart}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //----------------------------------------------------------------------------------------------
  //Wow camp images and videos
  saveinsertimgvid(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.insertinstitutionalphovidimgvid}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get uploaded images
  getuploadedimagesimgvid(
    country_code: any,
    customer_id: number,
    user_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getuploadedimageimgvid}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //get uploaded images
  getalldataindphovidimgvid(
    country_code: any,
    customer_id: number,
    gallery_file_category: number,
    page_no: number,
    page_per: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalldatatableindusphovidimgvid}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //----------------------------------------------------------------------------------------------
  //Wow industrial tour video and images
  saveinsertindtour(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.insertinstitutionalphovidindtour}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //get uploaded images
  getuploadedimagesindtour(
    country_code: any,
    customer_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getuploadedimageindtour}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //get uploaded images
  getalldataindphovidindtour(
    country_code: any,
    customer_id: number,
    gallery_file_category: number,
    page_no: number,
    page_per: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalldatatableindusphovidindtour}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //all data
  //get uploaded images
  getalldata(
    country_code: any,
    customer_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalltable}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  getwowscreendefualt(pageno: number, per_page: number): Observable<any> {
    return this.http.get<any>(
      `${environment.manageGetsterScreens}?pageno=${pageno}&per_page=${per_page}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  getalldatascreendefault(
    country_code: string,
    customer_id: number,
    pageno: number,
    per_page: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getalldatascreendefault}?country_code=${country_code}&customer_id=${customer_id}&page_no=${pageno}&per_page=${per_page}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  getdesc(
    country_code: any,
    customer_id: number,
    gallery_file_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getdesc}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_id=${gallery_file_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  getlaunch(
    country_code: any,
    customer_id: number,
    tagged_user_id: number,
    user_category_id: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getlaunch}?country_code=${country_code}&customer_id=${customer_id}&tagged_user_id=${tagged_user_id}&user_category_id=${user_category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  // getalldatascreendefault(
  //   country_code: any,
  //   customer_id: number,
  // ): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.getalldatascreendefault}?country_code=${country_code}&customer_id=${customer_id}`,
  //     this._jwtAuthService.getJwtToken()
  //   );
  // }

  getenablestatuscount(
    country_code: any,
    customer_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getenablestatuscount}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getenablestatuscountdefault(
    country_code: any,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getenablestatuscountdefault}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  cloudidpost(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.cloudidpost}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  getuploadedimagespost(
    country_code: any,
    customer_id: number,
    gallery_file_category: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getuploadedimagespost}?country_code=${country_code}&customer_id=${customer_id}&gallery_file_category=${gallery_file_category}`,
      this._jwtAuthService.getJwtToken()
    );
  }
}
