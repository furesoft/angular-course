import { Component, } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private environment: AuthService) {

  }

  get isLoggedIn() {
    return this.environment.isLoggedIn;
  }

  logout() {
    this.environment.logout();
  }
}
