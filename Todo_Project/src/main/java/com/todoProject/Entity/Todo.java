//package com.spring_security.Entity;
//
//import java.io.Serializable;
//import java.util.Date;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Table;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//
//import org.hibernate.annotations.CreationTimestamp;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import lombok.Data;
//
//
//
//@Data
//@Table
//@Entity
//public class Todo implements Serializable {
//
//	@Id
////	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private int ID;
//	private String Title;
//	private String Description;
//	
//	
//	@CreationTimestamp
//	private Date CreationTime;
//	
////	@ManyToOne
////    @JoinColumn(name = "username")
////	@JsonBackReference
////    private user user1;
//	
//	@ManyToOne
//	private user usr;
//	
//	
//}



package com.todoProject.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;




@Table(name = "Todo")
@Entity
public class Todo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "todo_seq_gen")
    @SequenceGenerator(name = "todo_seq_gen", sequenceName = "TODO_SEQ", allocationSize = 1)
    private int ID;
    private String Title;
    private String status;
    
    @Column(columnDefinition = "CLOB")
    private String Description;
    
    @CreationTimestamp
    private Date CreationTime;
    
    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    @JsonBackReference
    private user usr;
    
    
    public String getTitle() {
    	return this.Title;
    }
    
    public void setTitle(String Title) {
    	this.Title=Title;
    }

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public Date getCreationTime() {
		return CreationTime;
	}

	public void setCreationTime(Date creationTime) {
		CreationTime = creationTime;
	}

	public user getUsr() {
		return usr;
	}

	public void setUsr(user usr) {
		this.usr = usr;
	}

	public Todo(int iD, String title, String status, String description, Date creationTime, user usr) {
		super();
		ID = iD;
		Title = title;
		this.status = status;
		Description = description;
		CreationTime = creationTime;
		this.usr = usr;
	}

	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}

