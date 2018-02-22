package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
 * Servlet implementation class TopFivePurchasedBooksServlet
 */
@WebServlet("/TopFivePurchasedBooksServlet")
public class TopFivePurchasedBooksServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TopFivePurchasedBooksServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
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
    		ArrayList<String> purchases = new ArrayList<String>();
    		ArrayList<String> books = new ArrayList<String>();
    		List<Like> likes = new ArrayList<Like>();
    		List<Comment> comments = new ArrayList<Comment>();
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_ALL_PURCHASED_STMT);
				ResultSet rs = stmt.executeQuery();
				result = "Success";
				while (rs.next()){
					purchases.add(rs.getString(3));
				}
				
				stmt = conn.prepareStatement(AppConstants.SELECT_ALL_BOOKS_STMT);
				rs = stmt.executeQuery();
				result = "Success";
				while (rs.next()){
					books.add(rs.getString(2));
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
				rs.close();

			} catch (SQLException e) {
				getServletContext().log("Error", e);
	    		response.sendError(500);//internal server error
    		}
    		Gson gson = new GsonBuilder()
    				.setDateFormat("yyyy-MM-dd HH:mm:ss.S")
    				.create();
    		HashMap<String, Integer> bookCount = new HashMap<String, Integer>();
    		for(String book : books) {
    			int count = Collections.frequency(purchases, book);
    			bookCount.put(book, count);
    		}
    		ArrayList<String> maxPurchased = new ArrayList<String>();
    	    for(int i = 0; i < 5 ; i++) {
    	    	String maxBook = "";
    	    	int max = 0;
    	    	for (String key : bookCount.keySet()) {
    	    		if(max < (int)bookCount.get(key)) {
    	    			max = (int)bookCount.get(key);
    	    			maxBook = key;
    	    		}
          		}
        	    bookCount.remove(maxBook);
        	    maxPurchased.add(maxBook);
    	    }
    	    ArrayList<Book> mostPurchasedBooks = new ArrayList<Book>();
    	    try {
				for(int i = 0; i < 5 ; i++) {
					stmt = conn.prepareStatement(AppConstants.SELECT_BOOK_BY_NAME_STMT);
					stmt.setString(1, maxPurchased.get(i));
					ResultSet rs = stmt.executeQuery();
					if (rs.next()){
						mostPurchasedBooks.add(AssistantFuncs.CreateBookFromRS(rs));
					}
				}
			} catch (SQLException e) {
				getServletContext().log("Error", e);
	    		response.sendError(500);//internal server error
    		}    	    
    	    mostPurchasedBooks = AssistantFuncs.MatchLikesCommentsToBook(mostPurchasedBooks, likes, comments);
    	    JsonArray jsonBooks = new JsonArray();    		
    		for (Book book : mostPurchasedBooks) {
    			jsonBooks.add(gson.toJsonTree(book));
    		}
			conn.close();

    		response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		json.add("BookList", jsonBooks);
    		response.getWriter().println(json.toString());
        	response.getWriter().close();
        	response.setStatus(HttpServletResponse.SC_OK);
    	} catch (SQLException | NamingException e) {
    		getServletContext().log("Error while closing connection", e);
    		response.sendError(500);//internal server error
    	}
	}

}
