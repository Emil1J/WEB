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
import com.google.gson.JsonObject;

import booksForAll.general.AppConstants;
import booksForAll.general.AssistantFuncs;
import booksForAll.model.Book;
import booksForAll.model.Comment;
import booksForAll.model.Like;

/**
 * Servlet implementation class DislikeBookServlet
 */
@WebServlet(
		urlPatterns = "/DislikeBookServlet",
		initParams = {
				@WebInitParam(name = "Username", value = ""),
				@WebInitParam(name = "Bookname", value = "")
		})
	public class DislikeBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DislikeBookServlet() {
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
    		Book book = null;
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_LIKES_BY_USER_AND_BOOK_NAME_STMT);
				stmt.setString(1, username);
				stmt.setString(2, bookname);
				ResultSet rs = stmt.executeQuery(); 
				if (!rs.next()){
					result = "Book Not Liked";
				}
				else {
					stmt = conn.prepareStatement(AppConstants.DELETE_LIKE_BY_USER_AND_BOOK_NAME_STMT);
					stmt.setString(1, username);
					stmt.setString(2, bookname);
					int res = stmt.executeUpdate(); 
					if (res != 0){
						result = "Success";
						List<Like> likes = new ArrayList<Like>();
			    		List<Comment> comments = new ArrayList<Comment>();
			    		stmt = conn.prepareStatement(AppConstants.SELECT_BOOK_BY_NAME_STMT);
						stmt.setString(1, bookname);
						rs = stmt.executeQuery(); 
						if(rs.next()) {
							book = AssistantFuncs.CreateBookFromRS(rs);
							stmt = conn.prepareStatement(AppConstants.SELECT_LIKES_BY_BOOK_NAME_STMT);
							stmt.setString(1, bookname);
							rs = stmt.executeQuery();
							while (rs.next()){
								likes.add(AssistantFuncs.CreateLikeFromRS(rs));
							}
							stmt = conn.prepareStatement(AppConstants.SELECT_COMMENTS_BY_BOOK_NAME_STMT);
							stmt.setString(1, bookname);
							rs = stmt.executeQuery();
							while (rs.next()){
								comments.add(AssistantFuncs.CreateCommentFromRS(rs));
							}
							rs.close();
							book.setLikes(likes);
							book.setLikesNum(likes.size());
							book.setComments(comments);
						}
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
    		Gson gson = new GsonBuilder()
    				.setDateFormat("yyyy-MM-dd HH:mm:ss.S")
    				.create();
        	response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		json.add("Book", gson.toJsonTree(book));
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
