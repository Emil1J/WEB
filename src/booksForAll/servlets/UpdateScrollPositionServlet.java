package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
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
 * Servlet implementation class UpdateScrollPosition
 */
@WebServlet(
		urlPatterns = "/UpdateScrollPositionServlet",
		initParams = {
				@WebInitParam(name = "Username", value = ""),
				@WebInitParam(name = "Bookname", value = ""),
				@WebInitParam(name = "Position", value = "")
		})
public class UpdateScrollPositionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateScrollPositionServlet() {
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
		String position = request.getParameter("Position");
		String result = "";
		try {	
        	//obtain CustomerDB data source from Tomcat's context
	  		Context context = new InitialContext();
	  		BasicDataSource ds = (BasicDataSource)context.lookup(
				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
		    Connection conn = ds.getConnection();
		    PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.UPDATE_PURCHASED_SCROLL);
				stmt.setString(1, position);
				stmt.setString(2, bookname);
				stmt.setString(3, username);
				int res = stmt.executeUpdate(); 
				if (res != 0){
					result = "Success";
				}
				else {
					result = "Failure";
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