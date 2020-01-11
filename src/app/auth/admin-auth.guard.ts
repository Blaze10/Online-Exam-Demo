import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const isAuth = this.authService.getAuthStatus();
    const role = this.authService.getRole();
    if (!isAuth || role !== 'Admin') {
      alert('Unauthorized!');
      this.router.navigate(['/']);
    }
    return (isAuth && role === 'Admin');
  }
}
