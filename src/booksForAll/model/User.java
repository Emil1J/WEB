package booksForAll.model;

import java.util.ArrayList;

public class User {
	private String username;
	private String email;
	private String city;
	private String street;
	private int houseNum;
	private String postalCode;
	private String country;
	private String phoneNum;
	private String password;
	private String nickname;
	private String description;
	private String photo;
	private ArrayList<Book> books;
	private double balance;
	
	public User(String username, String email,  String city, String street, int houseNum, 
			String postalCode, String country, String phoneNum, String password,
			String nickname, String description, String photo, double balance) {
		this.username = username;
		this.email = email;
		this.city = city;
		this.street = street;
		this.houseNum = houseNum;
		this.postalCode = postalCode;
		this.country = country;
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
	public ArrayList<Book> getBooks() {
		return books;
	}
	public void setBooks(ArrayList<Book> books) {
		this.books = books;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public int getHouseNum() {
		return houseNum;
	}
	public void setHouseNum(int houseNum) {
		this.houseNum = houseNum;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
}
