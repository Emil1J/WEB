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
	public PostData(String username, String password, String bookname, String description, String message, String subject,
			String id, String adminoruser, String position, String reply) {
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
	}
}
