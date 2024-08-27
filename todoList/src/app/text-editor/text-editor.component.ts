import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

interface usr {
  username: string;
  password: string;
  email: string;
  role: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  creationTime: Date;
  usr: usr;
  status: string;
}
interface Utodo{
  title: string;
  description: string;
  status : string;
}

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    QuillModule,
    ReactiveFormsModule
  ],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  todo!: Todo;
  id : number;
  username : string | null;
  password : string | null;
  isEditMode: boolean = false;
  form!: FormGroup;



  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'size': ['xsmall', 'small', 'medium', 'large', 'xlarge'] }], // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link'] // remove formatting button
    ]
  }
  constructor(private route: ActivatedRoute, private http: HttpClient, private authServices : AuthService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(''),
      'description': new FormControl('')
    });

    
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
     this.username= this.route.snapshot.paramMap.get('username');
    this.password = this.authServices.getPassword();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ":" + this.password) });
    this.http.get<Todo>(`http://localhost:8081/todo/${this.username}/${this.id}`, { headers })
      .subscribe(todo => {
        this.todo = todo;
        this.form.patchValue({
          title: this.todo.title,
          description: this.todo.description
        });
      }, error => {
        console.error('Error fetching todo', error);
      });
  }

  onContentChanged(event: any) {
    // console.log('Editor content changed:', event.html);
  }

  onSave(stat : string) {
    console.log(stat)
    if (this.form.valid) {
      const uptodo: Utodo = {
        ...this.todo,
        ...this.form.value,
        status: stat
      };
      
      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ":" + this.password) });
      this.http.put<Todo>(`http://localhost:8081/todo/${this.username}/${this.id}/update`, uptodo, { headers })
        .subscribe(response => {
          console.log('Todo updated successfully:', response);
          this.openAlertDialog('Success', 'Todo updated successfully');
          
        }, error => {
          console.error('Error updating todo', error);
        });
    }
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
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
