// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { CommonModule } from '@angular/common';  
// import { BrowserModule } from '@angular/platform-browser';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [ CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   isLoggedIn: boolean = false;
//   username: string | null = null;

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.authService.isLoggedIn().subscribe(status => {
//       this.isLoggedIn = status;
      
//     });

//     this.authService.getUsernameObservable().subscribe(name => {
//       this.username = name;
//     });
//   }

//   logout(): void {
//     this.authService.logout();
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { CommonModule } from '@angular/common';  
// import { BrowserModule } from '@angular/platform-browser';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [ CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   isLoggedIn: boolean = false;
//   username: string | null = null;

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.isLoggedIn = this.authService.getIsLoggedIn();

//     if(this.isLoggedIn)
//       this.username=this.authService.getUsername();
//   }

//   logout(): void {
//     this.authService.logout();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = null;
    this.router.navigate(['/home']);
  }
}
