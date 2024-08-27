package com.todoProject.Entity;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;




@Entity
@Table(name="Users")
public class user implements Serializable {

    @Id
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
    private String role;
    
    @Lob
    @Column(name = "photo", length=1000)
    private byte[] photo;
    
    @OneToMany(mappedBy = "usr", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Todo> todo = new HashSet<>();
    
    
    public String getUsername() {
    	return this.username;
    }
    
    public void setUsername(String username) {
    	this.username=username;
    }
    
    public String getPassword() {
    	return this.password;
    }
    
    public void setPssword(String password) {
    	this.password=password;
    }
    
    public String getFirstname() {
    	return this.firstname;
    }
    
    public void setFirstname(String firstname) {
    	this.firstname=firstname;
    }
    
    public String getLastname() {
    	return this.lastname;
    }
    
    public void setLastname(String lastname) {
    	this.lastname=lastname;
    }

	@Override
	public String toString() {
		return "user [username=" + username + ", password=" + password + ", firstname=" + firstname + ", lastname="
				+ lastname + ", email=" + email + ", role=" + role + ", photo=" + Arrays.toString(photo) + ", todo="
				+ todo + "]";
	}

	public user() {
		super();
		// TODO Auto-generated constructor stub
	}

	public user(String username, String password, String firstname, String lastname, String email, String role,
			byte[] photo, Set<Todo> todo) {
		super();
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.role = role;
		this.photo = photo;
		this.todo = todo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public Set<Todo> getTodo() {
		return todo;
	}

	public void setTodo(Set<Todo> todo) {
		this.todo = todo;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}




