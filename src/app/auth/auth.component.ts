import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/User';
import { RecordService } from 'pocketbase';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  collection: RecordService<User>;

  constructor(private environment: AuthService, private router: Router) {

  }

  get isLoggedIn() {
    return this.environment.isLoggedIn;
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (this.isLoginMode) {
      this.environment.login(form.value);
    }
    else {
      this.environment.register(form.value);
      this.switchMode();
    }

    form.reset();
  }
}
