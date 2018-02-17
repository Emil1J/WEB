package booksForAll.model;

import java.sql.Timestamp;

public class Comment {
	private int id;
	private String description;
	private Timestamp time;
	private String username;
	private String bookName;
	private int approved;
	private String photo;
	
	public Comment(int id, String description, Timestamp time, String username, String bookName, int approved, String photo) {
		this.setId(id);
		this.description = description;
		this.time = time;
		this.username = username;
		this.bookName = bookName;
		this.approved = approved;
		this.setPhoto(photo);
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
}
