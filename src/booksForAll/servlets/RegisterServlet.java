package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.dbcp.dbcp2.BasicDataSource;
import com.google.gson.JsonObject;

import booksForAll.general.AppConstants;

/**
 * Servlet implementation class LoginServlet2
 */
@WebServlet(
		urlPatterns = "/RegisterServlet",
		initParams = {
				@WebInitParam(name = "Username", value = ""),
				@WebInitParam(name = "Email", value = ""),
				@WebInitParam(name = "Street", value = ""),
				@WebInitParam(name = "HouseNum", value = ""),
				@WebInitParam(name = "City", value = ""),
				@WebInitParam(name = "Country", value = ""),
				@WebInitParam(name = "PostalCode", value = ""),
				@WebInitParam(name = "PhoneNumber", value = ""),
				@WebInitParam(name = "Password", value = ""),
				@WebInitParam(name = "Nickname", value = ""),
				@WebInitParam(name = "Description", value = ""),
				@WebInitParam(name = "Photo", value = ""),
				@WebInitParam(name = "Balance", value = ""),
		})

	public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("Username");
		String email = request.getParameter("Email");
		String street = request.getParameter("Street");
		String houseNum = request.getParameter("HouseNum");
		String city = request.getParameter("City");
		String country = request.getParameter("Country");
		String postalCode = request.getParameter("PostalCode");
		String phoneNumber = request.getParameter("PhoneNumber");
		String nickname = request.getParameter("Nickname");
		String description = request.getParameter("Description");
		String photo = request.getParameter("Photo");
		String password = request.getParameter("Password");
		String balance = request.getParameter("Balance");
		String result = "";
		try {
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
/*USERNAME, EMAIL,"
			+ "CITY, STREET, HOUSENUM, POSTALCODE, COUNTRY, PHONENUM, PASSWORD, NICKNAME,"
			+ "DESCRIPTION, PHOTO, BALANCE*/
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_USERS_BY_NAME_STMT);
				stmt.setString(1, username);
				ResultSet rs = stmt.executeQuery(); 
				if (rs.next()){
					result = "User Exists";
				}
				else {
					stmt = conn.prepareStatement(AppConstants.INSERT_USER_STMT);
					stmt.setString(1, username);
					stmt.setString(2, email);
					stmt.setString(3, city);
					stmt.setString(4, street);
					stmt.setString(5, houseNum);
					stmt.setString(6, postalCode);
					stmt.setString(7, country);
					stmt.setString(8, phoneNumber);
					stmt.setString(9, password);
					stmt.setString(10, nickname);
					stmt.setString(11, description);
					stmt.setString(12, photo);
					stmt.setString(13, balance);
					int res = stmt.executeUpdate(); 
					if (res == 1){
						result = "Success";
					}
					else {
						result = "Failure";
					}
				}
				stmt.close();
			} catch (SQLException e) {
				getServletContext().log("Error while querying for customers", e);
	    		response.sendError(500);//internal server error
    		}

    		conn.close();
        	response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		response.getWriter().println(json.toString());
           	response.getWriter().close();
    	} catch (SQLException | NamingException e) {
    		getServletContext().log("Error while closing connection", e);
    		response.sendError(500);//internal server error
    	}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
