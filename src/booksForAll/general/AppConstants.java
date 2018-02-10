package booksForAll.general;

import java.lang.reflect.Type;
import java.util.Collection;

import com.google.gson.reflect.TypeToken;

import booksForAll.model.Customer;


/**
 * A simple place to hold global application constants
 */
public interface AppConstants {

	public final String CUSTOMERS = "customers";
	public final String CUSTOMERS_FILE = CUSTOMERS + ".json";
	public final String NAME = "name";
	public final Type USER_COLLECTION = new TypeToken<Collection<Customer>>() {}.getType();
	//derby constants
	public final String DB_NAME = "DB_NAME";
	public final String DB_DATASOURCE = "DB_DATASOURCE";
	public final String PROTOCOL = "jdbc:derby:"; 
	public final String OPEN = "Open";
	public final String SHUTDOWN = "Shutdown";
	
	//sql statements
	public final String CREATE_USERS_TABLE = "CREATE TABLE USERS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(50) NOT NULL,"
			+ "EMAIL VARCHAR(50) NOT NULL,"
			+ "CITY VARCHAR(50) NOT NULL,"
			+ "STREET VARCHAR(50) NOT NULL,"
			+ "HOUSENUM INTEGER NOT NULL,"
			+ "POSTALCODE VARCHAR(50) NOT NULL,"
			+ "COUNTRY VARCHAR(50) NOT NULL,"
			+ "PHONENUM VARCHAR(8) NOT NULL,"
			+ "PASSWORD VARCHAR(50) NOT NULL,"
			+ "NICKNAME VARCHAR(50) NOT NULL,"
			+ "DESCRIPTION VARCHAR(50) NOT NULL,"
			+ "PHOTO VARCHAR(50) NOT NULL,"
			+ "BALANCE REAL NOT NULL)";

	public final String INSERT_USER_STMT = "INSERT INTO USERS (USERNAME, EMAIL,"
			+ "CITY, STREET, HOUSENUM, POSTALCODE, COUNTRY, PHONENUM, PASSWORD, NICKNAME,"
			+ "DESCRIPTION, PHOTO, BALANCE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
	
	public final String SELECT_ALL_USERS_STMT = "SELECT * FROM USERS";
	
	public final String SELECT_USERS_BY_NAME_STMT = "SELECT * FROM USERS "
			+ "WHERE USERNAME=?";
	
	public final String SELECT_USERS_BY_NAME_PASS_STMT = "SELECT * FROM USERS "
			+ "WHERE USERNAME=? AND PASSWORD=?";
	
	public final String CREATE_BOOKS_TABLE = "CREATE TABLE BOOKS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "NAME VARCHAR(100) NOT NULL,"
			+ "AUTHOR VARCHAR(50) NOT NULL,"
			+ "URL VARCHAR(50) NOT NULL,"
			+ "PHOTO VARCHAR(50) NOT NULL,"
			+ "DESCRIPTION VARCHAR(50) NOT NULL,"
			+ "PRICE REAL NOT NULL)";
	
	public final String INSERT_BOOK_STMT = "INSERT INTO BOOKS (NAME, AUTHOR,"
			+ "URL, PHOTO, HOUSENUM, DESCRIPTION, PRICE) VALUES (?,?,?,?,?,?,?)";
	
	public final String SELECT_ALL_BOOKS_STMT = "SELECT * FROM BOOKS";
	
	public final String SELECT_BOOK_BY_NAME_STMT = "SELECT * FROM BOOKS "
			+ "WHERE NAME=?";
	
	public final String SELECT_BOOK_BY_AUTHOR_STMT = "SELECT * FROM BOOKS "
			+ "WHERE AUTHOR=?";
	
	public final String CREATE_COMMENTS_TABLE = "CREATE TABLE COMMENTS("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(50) NOT NULL,"
			+ "SUBMITDATE TIMESTAMP NOT NULL,"
			+ "DESCRIPTION VARCHAR(300) NOT NULL,"
			+ "BOOKNAME VARCHAR(100) NOT NULL,"
			+ "APPROVED INT NOT NULL)";
	
	public final String INSERT_COMMENT_STMT = "INSERT INTO BOOKS (USERNAME, SUBMITDATE,"
			+ "DESCRIPTION, BOOKNAME, APPROVED) VALUES (?,?,?,?,?)";
	
	public final String SELECT_ALL_COMMENTS_STMT = "SELECT * FROM COMMENTS";
	
	public final String SELECT_COMMENTS_BY_BOOK_NAME_STMT = "SELECT * FROM COMMENTS "
			+ "WHERE BOOKNAME=?";
	
	public final String SELECT_COMMENTS_BY_USER_STMT = "SELECT * FROM COMMENTS "
			+ "WHERE USERNAME=?";
	
	public final String CREATE_LIKES_TABLE = "CREATE TABLE LIKES("
			+ "ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
			+ "USERNAME VARCHAR(50) NOT NULL,"
			+ "BOOKNAME VARCHAR(100) NOT NULL)";
	
	public final String INSERT_LIKE_STMT = "INSERT INTO LIKES (USERNAME, BOOKNAME) VALUES (?,?)";
	
	public final String SELECT_ALL_LIKES_STMT = "SELECT * FROM LIKES";
	
	public final String SELECT_LIKES_BY_BOOK_NAME_STMT = "SELECT * FROM LIKES "
			+ "WHERE BOOKNAME=?";
	
	public final String SELECT_LIKES_BY_USER_STMT = "SELECT * FROM LIKES "
			+ "WHERE USERNAME=?";
}
