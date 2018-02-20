package booksForAll.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import booksForAll.filters.PostData;
import booksForAll.general.AppConstants;

/**
 * Servlet implementation class NewUserMessageServlet
 */
@WebServlet(
		urlPatterns = "/NewUserMessageServlet",
		initParams = {
				@WebInitParam(name = "Username", value = ""),
				@WebInitParam(name = "Message", value = ""),
				@WebInitParam(name = "Subject", value = "")
		})

	public class NewUserMessageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NewUserMessageServlet() {
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
			strBuf.append(line);
		Gson gson = new GsonBuilder()
				.setDateFormat("yyyy-MM-dd HH:mm:ss.S")
				.create();
		PostData postData = gson.fromJson(strBuf.toString(), PostData.class);

		String username = postData.Username;
		Timestamp current = new Timestamp(System.currentTimeMillis());
		String message = postData.Message;
		String subject = postData.Subject;
		String result = "";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();

    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.INSERT_MESSAGES_STMT);
				stmt.setString(1, username);
				stmt.setString(2, message);
				stmt.setString(3, subject);
				stmt.setTimestamp(4, current);
				stmt.setString(5, "");
				stmt.setInt(6, 0);
				stmt.setInt(7, 0);
				stmt.setInt(8, 0);
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

}
