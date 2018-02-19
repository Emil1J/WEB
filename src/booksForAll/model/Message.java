package booksForAll.model;

import java.sql.Timestamp;

public class Message {
	private int id;
	private String username;
	private String message;
	private Timestamp receiptdate;
	private String reply;
	private int adminread;
	private int adminreply;
	private int userread;
	
	public Message(int id, String username, String message, Timestamp receiptdate, 
			String reply, int adminread, int adminreply, int userread) {
		this.id = id;
		this.username = username;
		this.message = message;
		this.receiptdate = receiptdate;
		this.reply = reply;
		this.adminread = adminread;
		this.adminreply = adminreply;
		this.userread = userread;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Timestamp getReceiptdate() {
		return receiptdate;
	}

	public void setReceiptdate(Timestamp receiptdate) {
		this.receiptdate = receiptdate;
	}

	public String getReply() {
		return reply;
	}

	public void setReply(String reply) {
		this.reply = reply;
	}

	public int getAdminread() {
		return adminread;
	}

	public void setAdminread(int adminread) {
		this.adminread = adminread;
	}

	public int getAdminreply() {
		return adminreply;
	}

	public void setAdminreply(int adminreply) {
		this.adminreply = adminreply;
	}

	public int getUserread() {
		return userread;
	}

	public void setUserread(int userread) {
		this.userread = userread;
	}

}
