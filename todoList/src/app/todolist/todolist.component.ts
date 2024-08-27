import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface usr{
  username : string;
  password : string;
  email : string;
  role : string ;
}
interface todo{
  id:  number;
  title: string;
  description: string;
  creationTime: Date;
  usr: usr ;
  status :string;
}
interface todoB{
  title: string;
  description: string;
  creationTime: Date;
  usr: usr ;
  status :string;
}
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [HttpClientModule, CommonModule, DatePipe, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit {
   status: string;
   username: string | null = null;
   password: string | null = null;
   isLoggedIn: boolean;
   newtodo :string;
  todos: todo[] = [];
  constructor(private http: HttpClient, private datePipe: DatePipe, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.status = params.get('status') || '';
    });

    this.username= this.authService.getUsername();
    this.password = this.authService.getPassword();
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username+":"+this.password)})
    this.http.get<todo[]>(`http://localhost:8081/todo/${this.username}/all`,{headers})
    .subscribe(todos => {
      this.todos = todos.map(todo => ({
        ...todo,
         time: new Date(todo.creationTime) // Convert time string to Date object

      } ));
    });
    
  }
    
  formatCreatedAt(time: Date): string {
    return this.datePipe.transform(time, 'dd-MM-YYYY') || '';
  }

  save(): void {

    const newTodo: todoB = {
      title: this.newtodo!,
      description:'' ,
      creationTime: new Date(),
      usr: {
        username: this.username!,
        password: this.password!,
        email: '',  // Fill as necessary
        role: ''  // Fill as necessary
      },
      status : "A"
    };
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ":" + this.password) });

    this.http.post<todo>(`http://localhost:8081/todo/${this.username}/add`, newTodo, { headers })
      .subscribe(todo => {
        this.todos.push(todo);
      }, error => {
        console.error('Error saving todo', error);
      });
  }


  open(id : number):void{
    this.router.navigate([`${this.username}/todo/${id}/open`]);
  }

  onDelete(id: number, index: number): void {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ":" + this.password) });

    this.http.delete(`http://localhost:8081/todo/${this.username}/${id}/delete`, { headers })
      .subscribe(response => {
        console.log('Todo deleted successfully');
        this.todos.splice(index, 1); // Remove the todo from the list
        location.reload();
      }, error => {
        console.error('Error deleting todo', error);
      });
  }
}

