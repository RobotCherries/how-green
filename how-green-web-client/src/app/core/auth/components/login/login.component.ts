import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'avd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      email: ['john.doe@gmail.com', Validators.required],
      password: ['1234', Validators.required]
    });
  }

  login(): void {
    console.log(this.form.getRawValue());
    this.authService.login(this.form.getRawValue());
  }
}
