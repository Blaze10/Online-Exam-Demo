import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserAuthenticated = false;
  role: string;
  private authSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getAuthStatus();
    this.role = this.authService.getRole();

    this.authSubs = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isUserAuthenticated = authStatus;
      this.role = this.authService.getRole();
      console.log(authStatus);
      console.log(this.authService.getRole());
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
