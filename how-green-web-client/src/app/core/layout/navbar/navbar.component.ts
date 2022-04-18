import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth/auth.service';

@Component({
  selector: 'hg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isMenuCollapsed: boolean = true;

  constructor(public authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout();
  }

}
