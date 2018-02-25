package booksForAll.servlets;

import java.io.BufferedReader;
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
import javax.servlet.http.HttpSession;

import org.apache.tomcat.dbcp.dbcp2.BasicDataSource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import booksForAll.filters.PostData;
import booksForAll.general.AppConstants;
import booksForAll.model.User;

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
	
	//This class is used to register a new user.
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

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		StringBuffer strBuf = new StringBuffer();
		BufferedReader reader = request.getReader();
		String line = null;        
		while ((line = reader.readLine()) != null)
		{
			strBuf.append(line);
		}

		Gson gson = new GsonBuilder()
				.setDateFormat("yyyy-MM-dd HH:mm:ss.S")
				.create();

		PostData postData = gson.fromJson(strBuf.toString(), PostData.class);
		String username = postData.Username;
		String email = postData.Email;
		String street = postData.Street;
		String houseNum = postData.HouseNum;
		String city = postData.City;
		String country = postData.Country;
		String postalCode = postData.PostalCode;
		String phoneNumber = postData.PhoneNumber;
		String nickname = postData.Nickname;
		String description = postData.Description;
		String photo = postData.Photo;
		String password = postData.Password;
		String result = "";
		try {
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
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
				getServletContext().log("Error", e);
	    		response.sendError(500);//internal server error
    		}

    		conn.close();
    		
    		HttpSession sessionCheck = request.getSession(false);
			if(sessionCheck != null) {
				sessionCheck.invalidate();
			}
	        HttpSession session=request.getSession();
	        session.setAttribute("Username", username);
	        session.setAttribute("Password", password);

        	response.addHeader("Content-Type", "application/json");
        	User user = new User(username, email, city, street, Integer.parseInt(houseNum), postalCode, country, phoneNumber, password, nickname, description, photo);
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		json.add("User", gson.toJsonTree(user));
    		response.getWriter().println(json.toString());
           	response.getWriter().close();
    	} catch (SQLException | NamingException e) {
    		getServletContext().log("Error while closing connection", e);
    		response.sendError(500);//internal server error
    	}
	}

}
