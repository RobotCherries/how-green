import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent
  ],
})
export class CoreModule { }
