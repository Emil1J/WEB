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
	private int balance;
	
	public Customer(String username, String email, Address address, String phoneNum, String password,
			String nickname, String description, String photo) {
		username = this.username;
		email = this.email;
		address = this.address;
		phoneNum = this.phoneNum;
		password = this.password;
		nickname = this.nickname;
		description = this.description;
		photo = this.photo;
		setBalance(0);
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
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
}
