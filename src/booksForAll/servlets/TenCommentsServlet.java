package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import booksForAll.general.AppConstants;
import booksForAll.general.AssistantFuncs;
import booksForAll.model.Comment;

/**
 * Servlet implementation class TenCommentsServlet
 */
@WebServlet(
		urlPatterns = "/TenCommentsServlet",
		initParams = {
				@WebInitParam(name = "Bookname", value = ""),
				@WebInitParam(name = "CommentId", value = "")
		})
	public class TenCommentsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TenCommentsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String bookname = request.getParameter("Bookname");
		int commentId = Integer.parseInt(request.getParameter("CommentId"));
		String result = "";
		List<Comment> comments = new ArrayList<Comment>();
		try {	
        	//obtain CustomerDB data source from Tomcat's context
	  		Context context = new InitialContext();
	  		BasicDataSource ds = (BasicDataSource)context.lookup(
				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
		    Connection conn = ds.getConnection();
		    PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_COMMENTS_BY_BOOK_NAME_STMT);
				stmt.setString(1, bookname);
				ResultSet rs = stmt.executeQuery(); 
				while (rs.next()){
					result = "Success";
					comments.add(AssistantFuncs.CreateCommentFromRS(rs));
				}
				if(comments.isEmpty()) {
					result = "Failed";
				}
	    		Gson gson = new GsonBuilder()
	    				.setDateFormat("yyyy-MM-dd HH:mm:ss.S")
	    				.create();
	    		List<Comment> nextFiveComments = new ArrayList<Comment>();
	    		
	    		int i = 0;
	    		for(Comment comment : comments) {
    				if(comment.getId() > commentId) {
    					i++;
    					nextFiveComments.add(comment);
    					if(i == 5) {
    						break;
    					}
    				}
    			}
	    		JsonArray jsonComments = new JsonArray();
	    		for (Comment comment : nextFiveComments) {
	    			jsonComments.add(gson.toJsonTree(comment));
	    		}

				stmt.close();
				conn.close();
		        response.addHeader("Content-Type", "application/json");
		    	JsonObject json = new JsonObject();
		    	json.addProperty("Result", result);
		    	json.add("Comments", jsonComments);
		    	response.getWriter().println(json.toString());
		        response.getWriter().close();
		        response.setStatus(HttpServletResponse.SC_OK);
		    } catch (SQLException e) {
		    	getServletContext().log("Error while closing connection", e);
		    	response.sendError(500);//internal server error
		    }
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