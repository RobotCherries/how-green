import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/services/auth/auth.service';

@Component({
  selector: 'hg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed: boolean = true;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
