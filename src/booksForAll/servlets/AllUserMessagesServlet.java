package booksForAll.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;

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
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import booksForAll.filters.PostData;
import booksForAll.general.AppConstants;
import booksForAll.general.AssistantFuncs;
import booksForAll.model.Message;

/**
 * Servlet implementation class AllUserMessagesServlet
 */
@WebServlet(
		urlPatterns = "/AllUserMessagesServlet",
		initParams = {
				@WebInitParam(name = "Username", value = "")
		})

	public class AllUserMessagesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AllUserMessagesServlet() {
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
		String result = "";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
    		ArrayList<Message> messages = new ArrayList<Message>();
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_MESSAGES_BY_USER_STMT);
				stmt.setString(1, username);
				ResultSet rs = stmt.executeQuery();
				result = "Success";
				while (rs.next()){
					messages.add(AssistantFuncs.CreateMessageFromRS(rs));
				}
				rs.close();
				stmt.close();
			} catch (SQLException e) {
				getServletContext().log("Error", e);
	    		response.sendError(500);//internal server error
    		}

    		conn.close();
    		if(messages.isEmpty()) {
    			result = "Empty";
    		}
    		Collections.reverse(messages);

    		JsonArray jsonMessages = new JsonArray();
    		for (Message message : messages) {
    			jsonMessages.add(gson.toJsonTree(message));
    		}
    		
    		response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		json.add("Messages", jsonMessages);
    		response.getWriter().println(json.toString());
        	response.getWriter().close();
        	response.setStatus(HttpServletResponse.SC_OK);
    	} catch (SQLException | NamingException e) {
    		getServletContext().log("Error while closing connection", e);
    		response.sendError(500);//internal server error
    	}
	}
}
