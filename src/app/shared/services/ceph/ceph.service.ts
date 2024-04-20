import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtauthserviceService } from '../api/jwtauthservice.service';

// import * as DateTime from 'luxon';
@Injectable({
  providedIn: 'root',
})
export class CephService {
  private httpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private _jwtAutService: JwtauthserviceService
  ) {
    // this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  createFile(formData:any): Observable<any> {
    return this.http.post<any>(`${environment.create_file}`, formData,
    this._jwtAutService.getJwtToken()
    );
  }
  updateFile(formData:FormData): Observable<any> {
    return this.http.put<any>(`${environment.update_file}`, formData,
    this._jwtAutService.getJwtToken()
    );
  }

  deletefile(bucket_name:string,key:string): Observable<any> {
    return this.http.delete<any>(`${environment.delete_file_ceph}?bucket_name=${bucket_name}&key=${key}`,
    this._jwtAutService.getJwtToken()
    );
  }


  getFile(bucket_name: string, key: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'text/plain; charset=utf-8',
      observe: 'body',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    let options: any = { headers: headers, responseType: 'arraybuffer' };
    return this.http.get<any>(
      `${environment.get_file}?bucket_name=${bucket_name}&key=${key}`,
      options
      // this.jwtAutService.getJwtToken()
    );
  }

  getFileMultipleFilesBasedOnKey(
    bucket_name: string,
    keys: any
  ): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'text/plain; charset=utf-8',
      observe: 'body',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    let options: any = {
      headers: headers,
      responseType: 'json',
    };
    return this.http.get<any>(
      `${environment.get_file_multiple_files_based_on_key}?bucket_name=${bucket_name}&keys=${keys}`,
      options
      // this.jwtAutService.getJwtToken()
    );
  }

  getFileMultipleFilesBasedOnKeymanage(
    bucket_name: string,
    keys: any
  ): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'text/plain; charset=utf-8',
      observe: 'body',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    let options: any = {
      headers: headers,
      responseType: 'json',
    };
    return this.http.get<any>(
      `${environment.get_file_multiple_files_based_on_key_manage}?bucket_name=${bucket_name}&keys=${keys}`,
      options
      // this.jwtAutService.getJwtToken()
    );
  }
  // createFile(formData: FormData): Observable<any> {
  //   const req = this.http
  //     .post<any>(`${environment.create_file}`, formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .pipe(
  //       map((event) => {
  //         switch (event.type) {
  //           case HttpEventType.UploadProgress:
  //             return this.fileUploadProgress(event);
  //           case HttpEventType.Response:
  //             return this.apiResponse(event);
  //         }
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         return of({ progress_status: 'progress', progress_percent: 0 });
  //       })
  //     );

  //   return req;
  // }

  // private fileUploadProgress(event: any) {
  //   const percentDone = Math.round((100 * event.loaded) / event.total);
  //   return { progress_status: 'progress', progress_percent: percentDone };
  // }

  // private apiResponse(event: HttpResponse<any>) {
  //   return event.body;
  // }
}
