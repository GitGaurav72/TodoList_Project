// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private username: string | null = null;
//   private password: string | null = null;
//   private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

//   setUsername(username: string): void {
//     this.username = username;
//     this.usernameSubject.next(username);
//   }

//   getUsername(): string | null {
//     return this.username;
//   }

//   setPassword(password: string): void {
//     this.password = password;
//   }

//   getPassword(): string | null {
//     return this.password;
//   }

//   login(usernam: string, passwor: string): void {
    
//     this.setUsername(usernam);
//     this.setPassword(passwor);
//     this.isLoggedInSubject.next(true);
//   }

//   logout(): void {
//     this.username = null;
//     this.password = null;
//     this.isLoggedInSubject.next(false);
//     this.usernameSubject.next(null);
//   }

//   isLoggedIn(): Observable<boolean> {
//     return this.isLoggedInSubject.asObservable();
//   }

//   getUsernameObservable(): Observable<string | null> {
//     return this.usernameSubject.asObservable();
//   }
// }



// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private username: string 
//   private password: string 
//   // private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   // private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
//   private isLoggedIn : boolean = false;

//   setUsername(username: string): void {
//     this.username = username;
//     // this.usernameSubject.next(username);
//   }

//   getUsername(): string  {
//     return this.username;
//   }

//   setPassword(password: string): void {
//     this.password = password;
//   }

//   getPassword(): string{
//     return this.password;
//   }

//   login(usernam: string, passwor: string): void {
    
//     this.setUsername(usernam);
//     this.setPassword(passwor);
//     this.setIsLoggedIn(true)
//   }

//   logout(): void {
//     this.setIsLoggedIn(false)
//     // this.usernameSubject.next(null);
//   }

//   getIsLoggedIn(): boolean {
//     return this.isLoggedIn;
//   }

//   setIsLoggedIn(isLoggedIn : boolean): void {
//     this.isLoggedIn = isLoggedIn
//   }

//   // isLoggedIn(): Observable<boolean> {
//   //   return this.isLoggedInSubject.asObservable();
//   // }

//   // getUsernameObservable(): Observable<string | null> {
//   //   return this.usernameSubject.asObservable();
//   // }
// }



import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME_KEY = 'auth-username';
  private readonly PASSWORD_KEY = 'auth-password';
  private readonly IS_LOGGED_IN_KEY = 'is-logged-in';
  private credentials: string;


  constructor() {
    this.loadAuthState();
  }

  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  setPassword(password: string): void {
    localStorage.setItem(this.PASSWORD_KEY, password);
  }

  getPassword(): string | null {
    return localStorage.getItem(this.PASSWORD_KEY);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    localStorage.setItem(this.IS_LOGGED_IN_KEY, isLoggedIn.toString());
  }

  getIsLoggedIn(): boolean {
    return localStorage.getItem(this.IS_LOGGED_IN_KEY) === 'true';
  }

  login(username: string, password: string): void {
    this.setUsername(username);
    this.setPassword(password);
    this.setIsLoggedIn(true);
  }

  logout(): void {
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.PASSWORD_KEY);
    localStorage.removeItem(this.IS_LOGGED_IN_KEY);
  }

  private loadAuthState(): void {
    // Load initial state from local storage
    if (this.getIsLoggedIn()) {
      this.setUsername(this.getUsername() || '');
      this.setPassword(this.getPassword() || '');
    }
  }

  setCredentials(username: string, password: string) {
    const encodedCredentials = btoa(`${username}:${password}`);
    localStorage.setItem('auth', encodedCredentials);
}

  getCredentials() {
     return localStorage.getItem('auth');
  }
}

