import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public apiBaseUrl: string = environment.apiEndpoint;
public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


constructor(
  private httpClient: HttpClient,
  private router: Router,
) { }

  login(userCredentials: {}): void {
    this.httpClient.post(`${this.apiBaseUrl}/auth/login`, userCredentials, { withCredentials: true })
      .subscribe((res: any) => {
        AuthInterceptor.accessToken = res.token;
        this.isUserLoggedIn.next(true);

        this.router.navigate(['/']);
      });
  }

}
