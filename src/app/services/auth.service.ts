import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusListener = new Subject<boolean>();
  private role;
  private token;
  private userId;
  private isAuthenticated = false;
  tokenTimer;

  constructor(private http: HttpClient, private router: Router) { }

  // Getting the private properties
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getRole() {
    return this.role;
  }

  // User Sign up
  createUser(email: string, password: string, fullName: string) {
    const user = { email: email, password: password, fullName: fullName };
    this.http.post<{ message: string }>(`${BACKEND_URL}/signup`, user)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.authStatusListener.next(false);
      });
  }

  // user login
  userLogin(email: string, password: string) {
    const user = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number, role: string, userId: string }>(`${BACKEND_URL}/login`, user)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        if (token) {
          this.token = token;
          this.isAuthenticated = true;
          this.role = response.role;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const expiresIn = response.expiresIn;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(this.token, this.userId, expirationDate, this.role);
          this.setAuthTimeOut(expiresIn);
          if (this.role === 'Student') {
            this.router.navigate(['/exam']);
          } else {
            this.router.navigate(['/setup/setup-list']);
          }
          // navigate user ...
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  // Auto login user if token is not expired
  autoAuth() {
    const authInfomation = this.getAuthInfo();
    if (!authInfomation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfomation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setAuthTimeOut(expiresIn / 1000);
      this.token = authInfomation.token;
      this.role = authInfomation.role;
      this.userId = authInfomation.userId;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  // Logout user
  logout() {
    clearTimeout(this.tokenTimer);
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.role = null;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // save user info to local storage for auto login
  saveAuthData(token: string, userId: string, expirationDate: Date, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('role', role);
  }

  // Clear local storage
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('role');
  }

  // Get Auth info from localstorage for auto login
  getAuthInfo() {
    const authToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate');
    const role = localStorage.getItem('role');

    if (!authToken || !userId || !expirationDate || !role) {
      return;
    }
    return {
      token: authToken,
      userId: userId,
      expirationDate: new Date(expirationDate),
      role: role
    };
  }


  // Set timer so user gets logged out automatically after the token expires
  setAuthTimeOut(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
