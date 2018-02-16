package booksForAll.general;

/**
 * A simple place to hold global application constants
 */
public interface AppConstants {

	public final String BOOKS = "Json/Books";
	public final String BOOKS_JSON_FILE = BOOKS + ".json";
	public final String USERS = "Json/Users";
	public final String USERS_JSON_FILE = USERS + ".json";
	public final String COMMENTS = "Json/Comments";
	public final String COMMENTS_JSON_FILE = COMMENTS + ".json";
	public final String LIKES = "Json/Likes";
	public final String LIKES_JSON_FILE = LIKES + ".json";

	public final String NAME = "name";
	//derby constants
	public final String DB_NAME = "DB_NAME";
	public final String DB_DATASOURCE = "DB_DATASOURCE";
	public final String PROTOCOL = "jdbc:derby:"; 
	public final String OPEN = "Open";
	public final String SHUTDOWN = "Shutdown";
	
	//sql statements
	public final String CREATE_USERS_TABLE = "CREATE TABLE USERS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(10) NOT NULL,"
			+ "EMAIL VARCHAR(50) NOT NULL,"
			+ "CITY VARCHAR(50) NOT NULL,"
			+ "STREET VARCHAR(50) NOT NULL,"
			+ "HOUSENUM INTEGER NOT NULL,"
			+ "POSTALCODE VARCHAR(50) NOT NULL,"
			+ "COUNTRY VARCHAR(50) NOT NULL,"
			+ "PHONENUM VARCHAR(10) NOT NULL,"
			+ "PASSWORD VARCHAR(8) NOT NULL,"
			+ "NICKNAME VARCHAR(20) NOT NULL,"
			+ "DESCRIPTION VARCHAR(50) NOT NULL,"
			+ "PHOTO VARCHAR(700) NOT NULL,"
			+ "BALANCE REAL NOT NULL)";

	public final String INSERT_USER_STMT = "INSERT INTO USERS (USERNAME, EMAIL,"
			+ "CITY, STREET, HOUSENUM, POSTALCODE, COUNTRY, PHONENUM, PASSWORD, NICKNAME,"
			+ "DESCRIPTION, PHOTO, BALANCE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
	
	public final String DELETE_USER_STMT = "DELETE FROM USERS WHERE USERNAME=?";

	public final String SELECT_ALL_USERS_STMT = "SELECT * FROM USERS";
	
	public final String SELECT_USERS_BY_NAME_STMT = "SELECT * FROM USERS "
			+ "WHERE USERNAME=?";
	
	public final String SELECT_USERS_BY_NAME_PASS_STMT = "SELECT * FROM USERS "
			+ "WHERE USERNAME=? AND PASSWORD=?";
	
	public final String CREATE_BOOKS_TABLE = "CREATE TABLE BOOKS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "NAME VARCHAR(100) NOT NULL,"
			+ "AUTHOR VARCHAR(100) NOT NULL,"
			+ "URL VARCHAR(100) NOT NULL,"
			+ "PHOTO VARCHAR(100) NOT NULL,"
			+ "DESCRIPTION VARCHAR(700) NOT NULL,"
			+ "PRICE REAL NOT NULL)";
	
	public final String INSERT_BOOK_STMT = "INSERT INTO BOOKS (NAME, AUTHOR,"
			+ "URL, PHOTO, DESCRIPTION, PRICE) VALUES (?,?,?,?,?,?)";
	
	public final String DELETE_BOOK_BY_USER_STMT = "DELETE FROM BOOKS WHERE NAME=?";

	public final String SELECT_ALL_BOOKS_STMT = "SELECT * FROM BOOKS";
	
	public final String SELECT_BOOK_BY_NAME_STMT = "SELECT * FROM BOOKS "
			+ "WHERE NAME=?";
	
	public final String SELECT_BOOK_BY_AUTHOR_STMT = "SELECT * FROM BOOKS "
			+ "WHERE AUTHOR=?";
	
	public final String CREATE_COMMENTS_TABLE = "CREATE TABLE COMMENTS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(10) NOT NULL,"
			+ "SUBMITDATE TIMESTAMP NOT NULL,"
			+ "DESCRIPTION VARCHAR(500) NOT NULL,"
			+ "BOOKNAME VARCHAR(100) NOT NULL,"
			+ "APPROVED INT NOT NULL)";
	
	public final String INSERT_COMMENT_STMT = "INSERT INTO COMMENTS (USERNAME, SUBMITDATE,"
			+ "DESCRIPTION, BOOKNAME, APPROVED) VALUES (?,?,?,?,?)";
	
	public final String DELETE_COMMENTS_BY_USER_STMT = "DELETE FROM COMMENTS WHERE USERNAME=?";
	
	public final String DELETE_COMMENTS_BY_ID_STMT = "DELETE FROM COMMENTS WHERE ID=?";

	public final String SELECT_ALL_COMMENTS_STMT = "SELECT * FROM COMMENTS";
	
	public final String SELECT_COMMENTS_BY_BOOK_NAME_STMT = "SELECT * FROM COMMENTS "
			+ "WHERE BOOKNAME=?";
	
	public final String SELECT_COMMENTS_BY_USER_STMT = "SELECT * FROM COMMENTS "
			+ "WHERE USERNAME=?";
	
	public final String UPDATE_COMMENTS_APPROVE = "UPDATE COMMENTS SET APPROVED=1 WHERE ID=?";

	public final String CREATE_LIKES_TABLE = "CREATE TABLE LIKES("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(10) NOT NULL,"
			+ "BOOKNAME VARCHAR(100) NOT NULL)";
	
	public final String INSERT_LIKE_STMT = "INSERT INTO LIKES (USERNAME, BOOKNAME) VALUES (?,?)";
	
	public final String DELETE_LIKE_BY_USER_STMT = "DELETE FROM LIKES WHERE USERNAME=?";

	public final String DELETE_LIKE_BY_USER_AND_BOOK_NAME_STMT = "DELETE FROM LIKES WHERE USERNAME=? AND BOOKNAME=?";

	public final String SELECT_ALL_LIKES_STMT = "SELECT * FROM LIKES";
	
	public final String SELECT_LIKES_BY_BOOK_NAME_STMT = "SELECT * FROM LIKES "
			+ "WHERE BOOKNAME=?";
	
	public final String SELECT_LIKES_BY_USER_STMT = "SELECT * FROM LIKES "
			+ "WHERE USERNAME=?";
	
	public final String SELECT_LIKES_BY_USER_AND_BOOK_NAME_STMT = "SELECT * FROM LIKES "
			+ "WHERE USERNAME=? AND BOOKNAME=?";
	
	public final String CREATE_PURCHASED_BOOKS_TABLE = "CREATE TABLE PURCHASED("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(10) NOT NULL,"
			+ "BOOKNAME VARCHAR(100) NOT NULL)";
	
	public final String INSERT_PURCHASED_STMT = "INSERT INTO PURCHASED (USERNAME, BOOKNAME) VALUES (?,?)";
	
	public final String DELETE_PURCHASED_BY_USER_STMT = "DELETE FROM PURCHASED WHERE USERNAME=?";
	
	public final String DELETE_PURCHASED_BY_BOOK_STMT = "DELETE FROM PURCHASED WHERE BOOKNAME=?";
	
	public final String SELECT_ALL_PURCHASED_STMT = "SELECT * FROM PURCHASED";
	
	public final String SELECT_PURCHASED_BY_BOOK_NAME_STMT = "SELECT * FROM PURCHASED "
			+ "WHERE BOOKNAME=?";
	
	public final String SELECT_PURCHASED_BY_USER_STMT = "SELECT * FROM PURCHASED "
			+ "WHERE USERNAME=?";
	
	public final String SELECT_PURCHASED_BY_USER_AND_BOOK_NAME_STMT = "SELECT * FROM PURCHASED "
			+ "WHERE USERNAME=? AND BOOKNAME=?";
	
	public final String CREATE_TRANSACTIONS_TABLE = "CREATE TABLE TRANSACTIONS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(10) NOT NULL,"
			+ "BOOKNAME VARCHAR(100) NOT NULL,"
			+ "PRICE REAL NOT NULL,"
			+ "SUBMITDATE TIMESTAMP NOT NULL)";
	
	public final String INSERT_TRANSACTIONS_STMT = "INSERT INTO TRANSACTIONS (USERNAME, BOOKNAME, PRICE, SUBMITDATE) VALUES (?,?,?,?)";
	
	public final String DELETE_TRANSACTIONS_BY_USER_STMT = "DELETE FROM TRANSACTIONS WHERE USERNAME=?";
	
	public final String DELETE_TRANSACTIONS_BOOK_STMT = "DELETE FROM TRANSACTIONS WHERE BOOKNAME=?";
	
	public final String SELECT_ALL_TRANSACTIONS_STMT = "SELECT * FROM TRANSACTIONS";
	
	public final String SELECT_TRANSACTIONS_BY_BOOK_NAME_STMT = "SELECT * FROM TRANSACTIONS "
			+ "WHERE BOOKNAME=?";
	
	public final String SELECT_TRANSACTIONS_BY_USER_STMT = "SELECT * FROM TRANSACTIONS "
			+ "WHERE USERNAME=?";
	
	public final String SELECT_TRANSACTIONS_BY_USER_AND_BOOK_NAME_STMT = "SELECT * FROM TRANSACTIONS "
			+ "WHERE USERNAME=? AND BOOKNAME=?";
	
	public final String SELECT_TRANSACTIONS_BY_DATE_STMT = "SELECT * FROM TRANSACTIONS "
			+ "WHERE SUBMITDATE>=? AND SUBMITDATE<=?";
}
