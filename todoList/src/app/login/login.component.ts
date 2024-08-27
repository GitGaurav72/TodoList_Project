
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login() {
    // Make sure both username and password are provided
    if (!this.username || !this.password) {
      this.errorMessage = 'Please provide both username and password.';
      return;
    }

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    this.http.get<any>('http://localhost:8081/', { headers, responseType: 'text' as 'json' })
      .subscribe(
        response => {
          // Handle successful login
          this.authService.login(this.username, this.password);
          this.router.navigate([`/${this.username}/todolist/A`]);
        },
        error => {
          // Handle login error
          console.error('Login error:', error);
          this.errorMessage = 'Invalid username or password.';
        }
      );
  }
}
