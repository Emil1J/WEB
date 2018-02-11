package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
 * Servlet implementation class RemoveUserServlet
 */
@WebServlet(
		urlPatterns = "/RemoveUserServlet",
		initParams = {
		@WebInitParam(name = "Username", value = "")
		})
public class RemoveUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoveUserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("Username");
		String userDeletion = "Success";
		String commentsDeletion = "Success";
		String likesDeletion = "Success";
		String purchasedDeletion = "Success";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
    		PreparedStatement stmt = null;
			try {
				List<String> userTables = new ArrayList<String>();
				userTables.add(AppConstants.DELETE_USER_STMT);
	    		userTables.add(AppConstants.DELETE_COMMENTS_BY_USER_STMT);
	    		userTables.add(AppConstants.DELETE_LIKE_BY_USER_STMT);
	    		userTables.add(AppConstants.DELETE_PURCHASED_BY_USER_STMT);
	    		for(String table : userTables) {
	    			stmt = conn.prepareStatement(table);
					stmt.setString(1, username);
					int res = stmt.executeUpdate(); 
					if (res == 0){
						if(table.equals(AppConstants.DELETE_USER_STMT)) {
							userDeletion = "Failure";
						}
						else if(table.equalsIgnoreCase(AppConstants.DELETE_COMMENTS_BY_USER_STMT)) {
							commentsDeletion = "Failure";
						}
						else if(table.equalsIgnoreCase(AppConstants.DELETE_PURCHASED_BY_USER_STMT)) {
							purchasedDeletion = "Failure";
						}
						else {
							likesDeletion = "Failure";
						}
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
    		json.addProperty("UserDeletion", userDeletion);
    		json.addProperty("CommentsDeletion", commentsDeletion);
    		json.addProperty("LikesDeletion", likesDeletion);
    		json.addProperty("PurchasedDeletion", purchasedDeletion);
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
