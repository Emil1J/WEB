package booksForAll.model;

import java.util.List;

public class Customer {
	private String username;
	private String email;
	private Address address;
	private String phoneNum;
	private String password;
	private String nickname;
	private String description;
	private String photo;
	private List<String> books;
	private double balance;
	
	public Customer(String username, String email, Address address, String phoneNum, String password,
			String nickname, String description, String photo, double balance) {
		this.username = username;
		this.email = email;
		this.address = address;
		this.phoneNum = phoneNum;
		this.password = password;
		this.nickname = nickname;
		this.description = description;
		this.photo = photo;
		this.balance = balance;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public List<String> getBooks() {
		return books;
	}
	public void setBooks(List<String> books) {
		this.books = books;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
}
