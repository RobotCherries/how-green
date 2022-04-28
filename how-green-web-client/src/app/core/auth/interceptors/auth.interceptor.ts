import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public apiBaseUrl: string = environment.apiEndpoint;
  public refresh: boolean = false;
  public static accessToken: string = '';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const storedAccessToken = JSON.parse(localStorage.getItem('accessToken'));
    AuthInterceptor.accessToken = storedAccessToken;

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      console.log('err.status', err.status);
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;

        return this.httpClient.post(`${this.apiBaseUrl}/auth/refresh`, {}, { withCredentials: true }).pipe(
          switchMap((res: any) => {
            AuthInterceptor.accessToken = res.token;
            console.log('res.token', res.token);

            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`
              }
            }));
          })
        );
      }

      this.refresh = false;
      return throwError(() => {console.log('err', err); return err});
    }));
  }
}
