import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
