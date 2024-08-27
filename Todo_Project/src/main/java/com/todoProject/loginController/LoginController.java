package com.todoProject.loginController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
	
	
	@GetMapping("/")
    public String login() {
        return "redirect:http://localhost:4200/todolist";
    }
}
