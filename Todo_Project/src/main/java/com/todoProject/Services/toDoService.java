package com.todoProject.Services;



import java.util.List;
import java.util.Optional;

import com.todoProject.Entity.Todo;
import com.todoProject.Entity.TodoDto;



public interface toDoService {
	
	 void updateTodo(String username,int id, TodoDto todo);
	 void deleteTdo(String username,int id);
	 Todo saveTodo(String uname, Todo todo);
	 List<Todo> getalltodo(String username);
	 Todo gettodos(String username,int id);
}
