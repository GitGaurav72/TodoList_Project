package com.todoProject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.todoProject.Entity.Todo;
import com.todoProject.Entity.user;
import com.todoProject.Entity.userDto;
import com.todoProject.Repository.toDoRepository;
import com.todoProject.Services.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private toDoRepository todoRepository;

    @GetMapping("/{username}")
    public user getName(@PathVariable String username) {
        return userService.getbyname(username);
    }

    @PostMapping("/login")
    public String loging(@RequestBody userDto uDto) {
        return userService.login(uDto);
    }

    @GetMapping("/all")
    public List<user> getAll() {
        return userService.getall();
    }

    @PostMapping("/register")
    public void adduser(@RequestBody user user1) {
        userService.add(user1);
    }

    @GetMapping("/{username}/all")
    public List<Todo> getAllTodo(@PathVariable String username) {
        return todoRepository.getAllByUserName(username);
    }

    @PutMapping("/update")
    public String updateUser(@RequestParam("username") String username,
                             @RequestParam("firstname") String firstname,
                             @RequestParam("lastname") String lastname,
                             @RequestParam("email") String email,
                             @RequestParam("role") String role,
                             @RequestParam("photo") MultipartFile photo) {
        try {
            user updatedUser = new user();
            updatedUser.setUsername(username);
//            updatedUser.setPassword(password);
            updatedUser.setFirstname(firstname);
            updatedUser.setLastname(lastname);
            updatedUser.setEmail(email);
            updatedUser.setRole(role);
            updatedUser.setPhoto(photo.getBytes());
            
            userService.updateUser(updatedUser);
            return "User updated successfully";
        } catch (IOException e) {
            return "Error updating user: " + e.getMessage();
        }
    }
}
