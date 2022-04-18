import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { IUser } from './../../../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public apiBaseUrl: string = environment.apiEndpoint;
public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
public userData: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);


constructor(
  private router: Router,
  private httpClient: HttpClient,
) {
  this.refreshUserState();
}

  register(userCredentials: {}): void {
    this.httpClient
      .post(`${this.apiBaseUrl}/auth/register`, userCredentials, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  login(userCredentials: {}): void {
    this.httpClient
      .post(`${this.apiBaseUrl}/auth/login`, userCredentials, { withCredentials: true })
      .subscribe((res: any) => {
        AuthInterceptor.accessToken = res.token;

        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('jwtToken', res.token);

        this.isUserLoggedIn.next(true);
        this.getUserData();

        this.router.navigate(['/']);
      });
  }

  getUserData(): void {
    this.httpClient
      .get(`${this.apiBaseUrl}/auth/user`, { withCredentials: true })
      .subscribe((data: IUser) => {
        console.log('data', data);
        localStorage.setItem('userData', JSON.stringify(data));
        this.userData.next(data);
      });
  }

  refreshUserState(): void {
    const storedUserLogin = JSON.parse(localStorage.getItem('isUserLoggedIn'));
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    this.isUserLoggedIn.next(storedUserLogin);
    this.userData.next(storedUserData);
    console.log(this.isUserLoggedIn.value);
    console.log(this.userData.value);
  }

  logout(): void {
    this.httpClient
      .post(`${this.apiBaseUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe(res => {
        console.log('res', res);
        AuthInterceptor.accessToken = '';
        localStorage.removeItem('isUserLoggedIn');
        localStorage.removeItem('userData');
        localStorage.removeItem('jwtToken');

        this.router.navigate(['/login']);
      });
  }

}
