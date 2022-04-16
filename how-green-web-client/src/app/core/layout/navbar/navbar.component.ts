import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'hg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed: boolean = true;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

}
