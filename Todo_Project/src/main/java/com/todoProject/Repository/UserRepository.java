package com.todoProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todoProject.Entity.user;

@Repository
public interface UserRepository extends JpaRepository<user, String>{

	public user findByUsername(String username);

}
