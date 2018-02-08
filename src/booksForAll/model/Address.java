package booksForAll.model;

public class Address {
	private String city;
	private String street;
	private int houseNum;
	private int postalCode;
	
	public Address(String city, String street, int houseNum, int postalCode) {
		city = this.city;
		street = this.street;
		houseNum = this.houseNum;
		postalCode = this.postalCode;
	}
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
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

	public int getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(int postalCode) {
		this.postalCode = postalCode;
	}
}
