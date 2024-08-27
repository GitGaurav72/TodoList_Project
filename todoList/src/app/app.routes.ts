import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfileComponent } from './user-profile/user-profile.component';


 



export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:"home", component:HomeComponent},
    {path:"login", component:LoginComponent},
    {path:"signup", component:SignupComponent},
    {path:':username/todolist/:status', component: TodolistComponent},
    {path:":username/todo/:id/open", component:TextEditorComponent},
    {path:"about", component:AboutComponent},
    {path:"features",component:FeaturesComponent},
    {path:"profile/:username", component: UserProfileComponent}

];

@NgModule({
    imports: [FormsModule, BrowserModule, RouterModule.forRoot(routes),CommonModule, QuillModule.forRoot(), MatSnackBarModule], // Use RouterModule.forRoot for the root module
    exports: [RouterModule] // Export RouterModule to make the router directives available
})
export class AppRoutingModule { }
