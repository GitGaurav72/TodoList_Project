package com.todoProject.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.todoProject.Entity.Todo;
import com.todoProject.Entity.user;


@Repository
public interface toDoRepository extends JpaRepository<Todo,Integer>{
 
	@Query(value = "SELECT * FROM Todo WHERE username = :username", nativeQuery = true)
	public List<Todo> getAllByUserName(@Param("username") String username);

}
