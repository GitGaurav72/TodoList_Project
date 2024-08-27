package com.todoProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoProject.Entity.Todo;
import com.todoProject.Entity.TodoDto;
import com.todoProject.Services.toDoService;



@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:4200/") 
public class toDoController {

	@Autowired
	toDoService todoService;
	
	@PostMapping("/{username}/add")
	public Todo saveTodos(@PathVariable String username,  @RequestBody Todo todo) {
		return todoService.saveTodo(username, todo);
	}
	
	@GetMapping("/{username}/all")
	public List<Todo> getall(@PathVariable String username){
		return todoService.getalltodo(username);
	}
	
	@GetMapping("/{username}/{id}")
	public Todo gettodo(@PathVariable String username,@PathVariable int id) {
		return todoService.gettodos(username, id);
	}
	
	@PutMapping(path = "/{username}/{id}/update")
	public void updateTodos(@PathVariable String username, @PathVariable int id, @RequestBody TodoDto todo) {
		 todoService.updateTodo(username,id, todo);
	}
	
	@DeleteMapping(path = "/{username}/{id}/delete")
	public void deleteTodos(@PathVariable String username, @PathVariable int id) {
		todoService.deleteTdo(username, id);
	}
}
