import { Component, OnInit } from '@angular/core';
// import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Component({
  selector: 'avd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  async login() {
    // const googleProvider = new GoogleAuthProvider();

    // signInWithPopup(this.auth, googleProvider)
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })

  }

  logout() {
    // signOut(this.auth);
  }
}
