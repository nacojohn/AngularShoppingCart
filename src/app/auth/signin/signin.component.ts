import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn(signInForm: NgForm) {
    const email = signInForm.value.email;
    const password = signInForm.value.password;

    this.authService.signInUser(email, password);
  }
}
