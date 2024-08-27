import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';


interface User1 {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  photo: any; 
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  url: SafeUrl;
  name = 'Angular ' + VERSION.major;
  username: string | null;
  password: string | null;
  user1!: User1;
  base64Data: any;
  pic :  any;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router, private sanitizer: DomSanitizer, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: [''],
      photo: ['']
    });

    this.username = this.authService.getUsername();
    this.password = this.authService.getPassword();

    if (this.username && this.password) {
      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ":" + this.password) });
      this.http.get<User1>(`http://localhost:8081/public/${this.username}`, { headers })
        .subscribe(user => {
          this.user1 = user;
          this.pic=this.user1.photo;
          if (this.user1 && this.user1.photo) {
            this.base64Data = this.user1.photo;
            this.url = 'data:image/jpeg;base64,' + this.base64Data;
            
            // console.log(this.url)
          } else {
            this.url = 'https://www.w3schools.com/howto/img_avatar.png'; // Fallback URL
          }
          this.profileForm.patchValue({
            firstname: this.user1.firstname,
            lastname: this.user1.lastname,
            username: this.user1.username,
            email: this.user1.email,
            photo: this.url
            
          });
        }, error => {
          console.error('Error fetching user data', error);
        });
    }
  }
  onSelectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
  
      reader.onload = () => {
        this.url = reader.result as string;
      };
    } 
  }
  
  onSubmit(): void {
    const formData = new FormData();
    formData.append('firstname', this.profileForm.get('firstname')!.value);
    formData.append('lastname', this.profileForm.get('lastname')!.value);
    formData.append('username', this.profileForm.get('username')!.value);
    formData.append('email', this.profileForm.get('email')!.value);
    formData.append('role', 'admin');  // Add role to formData
  
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }else{
      formData.append('photo', this.pic);
    }
   
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ":" + this.password) });
    this.http.put(`http://localhost:8081/public/update`, formData, { headers }).subscribe(response => {
      // console.log('Profile saved successfully', response);
      this.openAlertDialog('Success', 'Profile updated successfully');
    }, error => {
      // console.error('Error updating profile', error);
      this.openAlertDialog('Error', 'Profile updation Failed');
    });
  }
  
  openAlertDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '200px',
      data: { title: title, message: message }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }  
}



