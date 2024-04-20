import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtauthserviceService {
  return!: string;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtHelperService
  ) {
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI1IiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvQ2FsY3V0dGEiLCJhcHBfbmFtZSI6InZrIiwiZGVmYXVsdF9jdXJyZW5jeV9zaG9ydGZvcm0iOiJJTlIiLCJhY2NvdW50aW5nX3N0YW5kYXJkc19pZCI6bnVsbCwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvMTIiLCJzb2NrZXRfaWQiOiIiLCJ1c2VyX2NhdGVnb3J5X3R5cGUiOiI0IiwiZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fY2F0ZWdvcnlfaWQiOiI2cmNaZzFNYUVPTlZTUFoiLCJ1c2VyX3JlZ2lzdGVyZWRfY2F0ZWdvcmllc19pZHMiOiJ3M1lveEJKcFVIcFNDZHUiLCJ1c2VyX3JlZ2lzdHJhdGlvbl9sb2dpbl9hcHByb3ZhbF9zdGF0dXMiOjEsImNvdW50cnkiOiJpbiIsInBpbl9jb2RlIjoicnR5cnkiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6IlRpcnVwYXR0dXIiLCJhZGRyZXNzX2xpbmVfMSI6IlZhbml5YW1iYWRpIiwiYWRkcmVzc19saW5lXzIiOiJWYW5peWFtYmFkaSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE3MDI0NDAzODQsImV4cCI6MTg2MjQ0MDM4NH0.OpajTZ2oYRnPa9XXqGW74GwNTIbp3iazPVfUZstTfcA'
    // );
    //     localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiIzIiwiY3VzdG9tZXJfaWQiOjQzLCJjb3VudHJ5X2NvZGUiOiJpbiIsImN1c3RvbWVyX3N1Yl9kb21haW5fbmFtZSI6Imdoc3Nob3N1ciIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6IkdIUyBIb3N1ciIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6bnVsbCwiYXBwX25hbWUiOiJHSFNTIEhvc3VyIiwiZGVmYXVsdF9jdXJyZW5jeV9zaG9ydGZvcm0iOm51bGwsImFjY291bnRpbmdfc3RhbmRhcmRzX2lkIjpudWxsLCJpc19kZWZhdWx0X2FjYWRlbWljX3llYXJfZm9ybWF0X3NwYW5uaW5nX3R3b19jYWxlbmRhcl95ZWFycyI6MSwiZGVmYXVsdF9hY2FkZW1pY195ZWFyX3N0YXJ0X2RhdGVfYW5kX21vbnRoIjoiNi8xMiIsInNvY2tldF9pZCI6IiIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoiNnJjWmcxTWFFT05WU1BaIiwidXNlcl9yZWdpc3RlcmVkX2NhdGVnb3JpZXNfaWRzIjoiQkRmaU1aM0w2M2V4alRaIiwidXNlcl9yZWdpc3RyYXRpb25fbG9naW5fYXBwcm92YWxfc3RhdHVzIjozLCJjb3VudHJ5IjoiaW4iLCJwaW5fY29kZSI6IjYzNTEwOSIsInN0YXRlX3Byb3ZpbmNlIjoiVGFtaWwgTmFkdSIsImNpdHlfZGlzdHJpY3RfY291bnR5IjoiSG9zdXIiLCJhZGRyZXNzX2xpbmVfMSI6IkJhZ2FsdXIgcm9hZCIsImFkZHJlc3NfbGluZV8yIjoiQkVISU5EIFJBSUxXQVkgU1RBVElPTiJ9LCJpYXQiOjE2OTAxOTY1NzAsImV4cCI6MTg1MDE5NjU3MH0.xXVPxUQa7UCUlAJuO2mMr3PUejXmg_Tl0VvMNuO5VVA'
    // );

    //customer 105 - testing - parent - nk - userreg(3)
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI2IiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvS29sa2F0YSIsImFwcF9uYW1lIjoidmsiLCJkZWZhdWx0X2N1cnJlbmN5X3Nob3J0Zm9ybSI6IklOUiIsImFjY291bnRpbmdfc3RhbmRhcmRzX2lkIjowLCJpc19kZWZhdWx0X2FjYWRlbWljX3llYXJfZm9ybWF0X3NwYW5uaW5nX3R3b19jYWxlbmRhcl95ZWFycyI6MSwiZGVmYXVsdF9hY2FkZW1pY195ZWFyX3N0YXJ0X2RhdGVfYW5kX21vbnRoIjoiNi82Iiwic29ja2V0X2lkIjoiIiwidXNlcl9jYXRlZ29yeV90eXBlIjoiMCIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoiNnJjWmcxTWFFT05WU1BaIiwidXNlcl9yZWdpc3RlcmVkX2NhdGVnb3JpZXNfaWRzIjoiVlN5bXNOT2F0cGpGTVhEIiwidXNlcl9yZWdpc3RyYXRpb25fbG9naW5fYXBwcm92YWxfc3RhdHVzIjozLCJjb3VudHJ5IjoiaW4iLCJwaW5fY29kZSI6IjYzNTEwOSIsInN0YXRlX3Byb3ZpbmNlIjoiVGFtaWwgTmFkdSIsImNpdHlfZGlzdHJpY3RfY291bnR5IjoiSG9zdXIiLCJhZGRyZXNzX2xpbmVfMSI6ImtyaXNobmFnaXJpIiwiYWRkcmVzc19saW5lXzIiOiJrcmlzaG5hZ2lyaSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE3MDYwMDMxNDcsImV4cCI6MTg2NjAwMzE0N30.-Gt0iytq40s3SnTD2sK7UaUs7UNlPH7xXdVUWZkFYpk'
    // );
    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {
    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: ('Bearer ' +
          localStorage.getItem('access_token')) as any,
      }),
    };

    return HTTP_OPTIONS;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
  decodeJwtToken(jwt_token: string) {
    return this.jwtService.decodeToken(jwt_token);
  }
}
