import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authSubs: Subscription;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.getAuthStatus()) {
      if (authService.getRole() === 'Student') {
        this.router.navigate(['/exam']);
      } else {
        this.router.navigate(['/setup/setup-list']);
      }
    }
   }

  ngOnInit() {
    this.authSubs = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.userLogin(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
