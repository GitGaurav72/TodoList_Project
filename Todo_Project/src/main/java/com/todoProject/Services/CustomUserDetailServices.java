package com.todoProject.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.todoProject.Entity.CustomUserDetail;
import com.todoProject.Entity.user;
import com.todoProject.Repository.UserRepository;



@Service
public class CustomUserDetailServices implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		user user1 = this.userRepository.findByUsername(username);
		if(user1 == null) {
			throw new UsernameNotFoundException("No User");
		}
		UserDetails user2 = User.withUsername(user1.getUsername())
				.password(user1.getPassword())
				.authorities("USER").build();
		
		return user2;
		
	}

}
