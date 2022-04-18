import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
