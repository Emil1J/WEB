package booksForAll.model;

public class Like {
	private String username;
	private String nickname;
	private String bookname;
	
	public Like(String username, String nickname, String bookname) {
		this.username = username;
		this.nickname = nickname;
		this.bookname = bookname;
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

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
}
