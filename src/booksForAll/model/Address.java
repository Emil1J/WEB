package booksForAll.model;

public class Address {
	private String city;
	private String street;
	private int houseNum;
	private String postalCode;
	private String country;
	
	public Address(String city, String street, int houseNum, String postalCode, String country) {
		this.city = city;
		this.street = street;
		this.houseNum = houseNum;
		this.postalCode = postalCode;
		this.country = country;
	}
	
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
}
