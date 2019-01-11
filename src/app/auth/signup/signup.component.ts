import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(signUpForm: NgForm) {
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;

    this.authService.signUpUser(email, password);
  }
}
