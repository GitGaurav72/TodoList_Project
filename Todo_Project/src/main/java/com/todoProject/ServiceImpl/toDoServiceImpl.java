package com.todoProject.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoProject.Entity.Todo;
import com.todoProject.Entity.TodoDto;
import com.todoProject.Repository.toDoRepository;
import com.todoProject.Services.toDoService;


@Service
public class toDoServiceImpl implements toDoService {
	
	@Autowired
	private toDoRepository toDoRepo;

	@Override
	public Todo saveTodo(String uname, Todo todo) {
		toDoRepo.save(todo);
		return todo;
	}
	
	@Override
	public Todo gettodos(String username,int id) {
		
		return toDoRepo.findById(id).orElse(null);
	}

	@Override
	public List<Todo> getalltodo(String username) {
		List<Todo> l = toDoRepo.getAllByUserName(username);
		return l;
		
	}

	@Override
	public void updateTodo(String username, int id, TodoDto todo) {
		    Todo updatedTodo = toDoRepo.getById(id);
		    updatedTodo.setTitle(todo.getTitle());
		    updatedTodo.setDescription(todo.getDescription());
		    updatedTodo.setStatus(todo.getStatus());
			toDoRepo.save(updatedTodo);
		
	}

	@Override
	public void deleteTdo(String username, int id) {
		// TODO Auto-generated method stub
		toDoRepo.deleteById(id);
	}

	

	
}
