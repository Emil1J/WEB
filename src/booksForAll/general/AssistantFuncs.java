package booksForAll.general;

import java.sql.ResultSet;
import java.sql.SQLException;

import booksForAll.model.Book;
import booksForAll.model.Comment;
import booksForAll.model.Like;
import booksForAll.model.User;

public class AssistantFuncs {

	public static User CreateUserFromRS(ResultSet rs) throws SQLException {
		return new User(rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11),
				rs.getString(12), rs.getString(13), rs.getInt(14));
	}
	
	public static Book CreateBookFromRS(ResultSet rs) throws SQLException {
		return new Book(rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(7), rs.getString(6), null, null);
	}
	
	public static Like CreateLikeFromRS(ResultSet rs) throws SQLException {
		return new Like(rs.getString(2), rs.getString(3));
	}
	
	public static Comment CreateCommentFromRS(ResultSet rs) throws SQLException {
		return new Comment(rs.getInt(1), rs.getString(4), rs.getTimestamp(3), rs.getString(2), rs.getString(5), rs.getInt(6));
	}
}
