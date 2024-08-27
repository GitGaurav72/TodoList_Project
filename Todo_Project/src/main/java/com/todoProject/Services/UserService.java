package com.todoProject.Services;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.todoProject.Entity.user;
import com.todoProject.Entity.userDto;
import com.todoProject.Repository.UserRepository;
import com.todoProject.MySecurityConfig.imgComp;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<user> getall() {
        return userRepository.findAll();
    }

    public void add(user user1) {
        user1.setPassword(bCryptPasswordEncoder.encode(user1.getPassword()));
        userRepository.save(user1);
    }

    public user getbyname(String username) {
    	user u = userRepository.findByUsername(username);
    	if(u.getPhoto()!=null) u.setPhoto(imgComp.decompressBytes(u.getPhoto()));
    	u.setTodo(new HashSet<>());
        return u;
    }

    public String login(userDto uDto) {
        user u = userRepository.findByUsername(uDto.getUsername());
        if (u != null) {
            if (bCryptPasswordEncoder.matches(uDto.getPassword(), u.getPassword()))
                return "login Successfully";
            else
                return "Incorrect Password";
        } else
            return "User does not Exist";
    }

    public void updateUser(user updatedUser) {
        user existingUser = userRepository.findByUsername(updatedUser.getUsername());
        if (existingUser != null) {
//            existingUser.setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setPhoto(imgComp.compressBytes(updatedUser.getPhoto()));
            userRepository.save(existingUser);
        }
    }
}
