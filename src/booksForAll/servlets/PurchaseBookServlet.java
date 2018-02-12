package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

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
import booksForAll.general.AssistantFuncs;
import booksForAll.model.Book;

/**
 * Servlet implementation class PurchaseBookServlet
 */
@WebServlet(
		urlPatterns = "/PurchaseBookServlet",
		initParams = {
				@WebInitParam(name = "Username", value = ""),
				@WebInitParam(name = "Bookname", value = "")
		})
	
	public class PurchaseBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PurchaseBookServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("Username");
		String bookname = request.getParameter("Bookname");
		String result = "";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();

    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_PURCHASED_BY_USER_AND_BOOK_NAME_STMT);
				stmt.setString(1, username);
				stmt.setString(2, bookname);
				ResultSet rs = stmt.executeQuery(); 
				if (rs.next()){
					result = "Book Already Purchased";
				}
				else {
					stmt = conn.prepareStatement(AppConstants.INSERT_PURCHASED_STMT);
					stmt.setString(1, username);
					stmt.setString(2, bookname);
					int res = stmt.executeUpdate();
					if (res != 0){
						result = "Success";
						stmt = conn.prepareStatement(AppConstants.SELECT_BOOK_BY_NAME_STMT);
						stmt.setString(1, bookname);
						rs = stmt.executeQuery();
						Book book = null;
						if(rs.next()) {
							book = AssistantFuncs.CreateBookFromRS(rs);
						}
						stmt = conn.prepareStatement(AppConstants.INSERT_TRANSACTIONS_STMT);
						stmt.setString(1, username);
						stmt.setString(2, bookname);
						stmt.setDouble(3, book.getPrice());
						stmt.setTimestamp(4, new Timestamp(System.currentTimeMillis()));
						stmt.executeUpdate();
						rs.close();
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
    		
        	response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		response.getWriter().println(json.toString());
        	response.getWriter().close();
        	response.setStatus(HttpServletResponse.SC_OK);
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