import { Component, } from '@angular/core';
import { EnvironmentService } from '../shared/environment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private environment: EnvironmentService) {

  }

  get isLoggedIn() {
    return this.environment.isLoggedIn;
  }

  logout() {
    this.environment.logout();
  }
}
