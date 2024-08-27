package com.todoProject.Entity;

public class TodoDto {

    private String Title;
	private String Description;
    private String status;
    
    
    public String getTitle() {
    	return this.Title;
    }
    
    public void setTitle(String Title) {
    	this.Title=Title;
    }
    
    public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public TodoDto(String title, String description, String status) {
		super();
		Title = title;
		Description = description;
		this.status = status;
	}
    
}
