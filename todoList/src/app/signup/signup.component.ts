import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role:string;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    if (!this.username || !this.password || !this.email || !this.firstname || !this.lastname || !this.role) {
      this.errorMessage = 'Please provide username, email, and password.';
      return;
    }

    this.http.post('http://localhost:8081/public/register', { username: this.username, email: this.email, password: this.password, firstname: this.firstname, lastname: this.lastname, role :this.role })
      .subscribe(
        response => {
          // Handle successful registration
          console.log('Register successful');
          // Redirect to the login page
          this.router.navigate(['/login']);
        },
        error => {
          // Handle registration error
          console.error('Registration error:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }
}
