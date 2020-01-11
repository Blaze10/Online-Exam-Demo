import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authSubs: Subscription;

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

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.fullName);
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
