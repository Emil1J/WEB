package booksForAll.model;

import java.sql.Timestamp;

public class Transaction {
	private String username;
	private String bookname;
	private double price;
	private Timestamp time;

	public Transaction(String username, String bookname, double price, Timestamp time) {
		this.username = username;
		this.bookname = bookname;
		this.price = price;
		this.time = time;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}
}
