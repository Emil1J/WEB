package booksForAll.model;

public class Like {
	private String username;
	private String bookname;
	
	public Like(String username, String bookname) {
		this.setUsername(username);
		this.setBookname(bookname);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}
}
