import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/progress-bar-loader/loader.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    public loaderService: LoaderService,
    public snackbarService: SnackBarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    req = req.clone({ url: environment.baseURL + req.url });
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        this.snackbarService.error(error.error['message']);
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
