package booksForAll.general;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import booksForAll.model.Book;
import booksForAll.model.Comment;
import booksForAll.model.Like;
import booksForAll.model.Message;
import booksForAll.model.Purchase;
import booksForAll.model.Transaction;
import booksForAll.model.User;

//This is a class user in all servlets to assist in building objects and creating responses.
public class AssistantFuncs {

	//Create a user object form the ResultSet rs.
	public static User CreateUserFromRS(ResultSet rs) throws SQLException {
		return new User(rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11),
				rs.getString(12), rs.getString(13));
	}

	//Create a book object form the ResultSet rs.
	public static Book CreateBookFromRS(ResultSet rs) throws SQLException {
		return new Book(rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(7), rs.getString(6), 0, null, null);
	}

	//Create a like object form the ResultSet rs.
	public static Like CreateLikeFromRS(ResultSet rs) throws SQLException {
		return new Like(rs.getString(2), rs.getString(3), rs.getString(4));
	}

	//Create a comment object form the ResultSet rs.
	public static Comment CreateCommentFromRS(ResultSet rs) throws SQLException {
		return new Comment(rs.getInt(1), rs.getString(4), rs.getTimestamp(3), rs.getString(2), rs.getString(5), rs.getInt(6), rs.getString(7));
	}

	//Create a message object form the ResultSet rs.
	public static Message CreateMessageFromRS(ResultSet rs) throws SQLException {
		return new Message(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getTimestamp(5), rs.getString(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
	}

	//Create a purchase object form the ResultSet rs.
	public static Purchase CreatePurchaseFromRS(ResultSet rs) throws SQLException {
		return new Purchase(rs.getString(1), rs.getString(2));
	}
	
	//Set for books the likes number according to the likes list in each book.
	public static ArrayList<Book> SetLikesNumForBooks(ArrayList<Book> books){
		for(Book book : books) {
			book.setLikesNum(book.getLikes().size());
		}
		return books;
	}

	//Match likes and comments to the books list.
	public static ArrayList<Book> MatchLikesCommentsToBook(ArrayList<Book> books, List<Like> likes, List<Comment> comments){
		for(Book book : books) {
			List<Like> bookLikes = new ArrayList<Like>();
			for(Like like : likes) {
				if(book.getName().equals(like.getBookname())) {
					bookLikes.add(like);
				}
			}
			book.setLikes(bookLikes);
			List<Comment> bookComments = new ArrayList<Comment>();
			for(Comment comment : comments) {
				if(book.getName().equals(comment.getBookName())) {
					bookComments.add(comment);
				}
			}
			if (bookComments.size() > 0) {
				  Collections.sort(bookComments, new Comparator<Comment>() {
				      @Override
				      public int compare(final Comment object1, final Comment object2) {
				          return (object1.getTime().before(object2.getTime())? -1 : 1);
				      }
				  });
			}
			book.setComments(bookComments);
		}
		return books;
	}
	
	//Create transactions object from ResultSet rs.
	public static Transaction CreateTransactionFromRS(ResultSet rs) throws SQLException {
		return new Transaction(rs.getString(2), rs.getString(3), rs.getDouble(4), rs.getTimestamp(5));
	}
}
