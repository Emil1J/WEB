package booksForAll.model;

import java.sql.Date;

public class Comment {
	private String description;
	private Date date;
	private String username;
	
	public Comment(String description, Date date, String username) {
		description = this.description;
		date = this.date;
		username = this.username;
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
}
