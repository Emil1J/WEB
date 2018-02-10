package booksForAll.general;

import java.sql.ResultSet;
import java.sql.SQLException;

import booksForAll.model.Address;
import booksForAll.model.Customer;

public class AssistantFuncs {

	public static Customer CreateCustomerFromRS(ResultSet rs) throws SQLException {
		Address add = new Address(rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8));
		return new Customer(rs.getString(2), rs.getString(3), add, rs.getString(9), rs.getString(10), rs.getString(11),
				rs.getString(12), rs.getString(13), rs.getInt(14));
	}
}
