package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
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
import booksForAll.model.Book;
import booksForAll.model.Comment;
import booksForAll.model.Like;
import booksForAll.model.User;

/**
 * Servlet implementation class TopFiveActiveUsersServlet
 */
@WebServlet("/TopFiveActiveUsersServlet")
//This class is used to get the top five active users (sorted by purchased books).
public class TopFiveActiveUsersServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TopFiveActiveUsersServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String result = "";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
    		ArrayList<User> users = new ArrayList<User>();
    		ArrayList<Book> books = new ArrayList<Book>();
    		List<Like> likes = new ArrayList<Like>();
    		List<Comment> comments = new ArrayList<Comment>();
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_ALL_BOOKS_STMT);
				ResultSet rs = stmt.executeQuery();
				result = "Success";
				while (rs.next()){
					books.add(AssistantFuncs.CreateBookFromRS(rs));
				}
				stmt = conn.prepareStatement(AppConstants.SELECT_ALL_LIKES_STMT);
				rs = stmt.executeQuery();
				while (rs.next()){
					likes.add(AssistantFuncs.CreateLikeFromRS(rs));
				}
				stmt = conn.prepareStatement(AppConstants.SELECT_ALL_APPROVED_COMMENTS_STMT);
				rs = stmt.executeQuery();
				while (rs.next()){
					comments.add(AssistantFuncs.CreateCommentFromRS(rs));
				}
				books = AssistantFuncs.MatchLikesCommentsToBook(books, likes, comments);
				books = AssistantFuncs.SetLikesNumForBooks(books);
				stmt = conn.prepareStatement(AppConstants.SELECT_ALL_USERS_STMT);
				rs = stmt.executeQuery();
				while (rs.next()){
					users.add(AssistantFuncs.CreateUserFromRS(rs));
				}
				if(users.isEmpty()) {
					result = "No Users";
		    		JsonObject json = new JsonObject();
		    		json.addProperty("Result", result);
					response.getWriter().println(json.toString());
		        	response.getWriter().close();
		        	response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		        	return;
				}
				for(User user : users) {
					user.setBooks(GetUserBooks(user.getUsername(), conn, books));
				}
				rs.close();
				stmt.close();
			} catch (SQLException e) {
				getServletContext().log("Error", e);
	    		response.sendError(500);//internal server error
    		}

    		conn.close();
    		Gson gson = new GsonBuilder()
    				.setDateFormat("yyyy-MM-dd HH:mm:ss.S")
    				.create();
    		JsonArray jsonUsers = new JsonArray();
    		if (users.size() > 0) {
    			  Collections.sort(users, new Comparator<User>() {
    			      @Override
    			      public int compare(final User object1, final User object2) {
    			          return (object1.getBooks().size() < object2.getBooks().size())? 1 : -1;
    			      }
    			  });
    		}
    		users.subList(5, users.size()).clear();
    		
    		for (User user : users) {
    			jsonUsers.add(gson.toJsonTree(user));
    		}
    		
    		response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		json.add("UsersList", jsonUsers);
    		response.getWriter().println(json.toString());
        	response.getWriter().close();
        	response.setStatus(HttpServletResponse.SC_OK);
    	} catch (SQLException | NamingException e) {
    		getServletContext().log("Error while closing connection", e);
    		response.sendError(500);//internal server error
    	}
	}
	
	public ArrayList<Book> GetUserBooks(String username, Connection conn, ArrayList<Book> books){
		PreparedStatement stmt;
		ArrayList<Book> userBooks = new ArrayList<Book>();
		try {
			stmt = conn.prepareStatement(AppConstants.SELECT_PURCHASED_BY_USER_STMT);
			stmt.setString(1, username);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				for(Book book : books) {
					if(rs.getString(3).equals(book.getName())) {
						userBooks.add(book);
					}
				}
			}
			rs.close();				
			stmt.close();
		} catch (SQLException e) {
			getServletContext().log("Error", e);
		}
		return userBooks;
	}
}


