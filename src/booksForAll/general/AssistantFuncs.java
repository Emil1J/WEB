package booksForAll.general;

import java.sql.ResultSet;
import java.sql.SQLException;

import booksForAll.model.User;

public class AssistantFuncs {

	public static User CreateCustomerFromRS(ResultSet rs) throws SQLException {
		return new User(rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11),
				rs.getString(12), rs.getString(13), rs.getInt(14));
	}
}
