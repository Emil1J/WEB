package booksForAll.filters;

public class PostData {
	public String Username;
	public String Password;
	public String Bookname;
	public String Description;
	public String Message;
	public String Subject;
	public String ID;
	public String AdminOrUser;
	public String Position;
	public String Reply;
	public String Email;
	public String Street;
	public String HouseNum;
	public String City;
	public String Country;
	public String PostalCode;
	public String PhoneNumber;
	public String Nickname;
	public String Photo;
	public String Balance;
	public PostData(String username, String password, String bookname, String description, String message, String subject,
			String id, String adminoruser, String position, String reply, String email, String street, String housenum,
			String city, String country, String postalcode, String phonenumber, String nickname, String photo, String balance) {
		super();
		Username = username;
		Password = password;
		Bookname = bookname;
		Description = description;
		Message = message;
		Subject = subject;
		ID = id;
		AdminOrUser = adminoruser;
		Position = position;
		Reply = reply;
		Email = email;
		Street = street;
		HouseNum = housenum;
		City = city;
		Country = country;
		PostalCode = postalcode;
		PhoneNumber = phonenumber;
		Nickname = nickname;
		Photo = photo;
		Balance = balance;
	}
}
