import { NgModule, importProvidersFrom } from '@angular/core';
import  { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { QuillModule } from 'ngx-quill';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations:[
        AppComponent,
    ],
    imports: [
        FormsModule,
        NgModule,
        AppComponent,
        HttpClientModule,
        BrowserModule,
        CommonModule,
        AuthService,
        QuillModule,
        MatSnackBar,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        FormGroup,
        ReactiveFormsModule,
        

    ],
    providers:[provideHttpClient(),DatePipe, NgModule],
    bootstrap:[AppComponent]

})
export class AppModule{ }


