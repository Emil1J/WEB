package booksForAll.model;

import java.sql.Date;

public class Comment {
	private String description;
	private Date date;
	private String username;
	private int approved;
	
	public Comment(String description, Date date, String username, int approved) {
		this.description = description;
		this.date = date;
		this.username = username;
		this.setApproved(approved);
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getApproved() {
		return approved;
	}

	public void setApproved(int approved) {
		this.approved = approved;
	}
}