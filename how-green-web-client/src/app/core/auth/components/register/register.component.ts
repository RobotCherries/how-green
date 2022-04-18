import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswords } from 'src/app/shared/custom-field-validators/match-passwords';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'hg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.valueChanges.subscribe(val => console.log(val, this.form.valid))
  }

  initForm(): void {
    this.form = this.formBuilder.group(
      {
        name: ['John Doe', Validators.required],
        email: ['john.doe@gmail.com', [Validators.required, Validators.email]],
        password: ['1234', Validators.required],
        confirmPassword: ['1234', Validators.required]
      },
      {
        validators: checkPasswords
      }
    );
  }

  register(): void {
    const { confirmPassword, ...rest } = this.form.getRawValue();
    console.log(rest);
    this.authService.register(this.form.getRawValue());
  }
}
