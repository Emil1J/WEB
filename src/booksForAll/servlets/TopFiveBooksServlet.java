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

/**
 * Servlet implementation class TopFiveBooksServlet
 */
@WebServlet("/TopFiveBooksServlet")
public class TopFiveBooksServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TopFiveBooksServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String result = "";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
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
				if(books.isEmpty()) {
					result = "Failure";
		    		JsonObject json = new JsonObject();
		    		json.addProperty("Result", result);
					response.getWriter().println(json.toString());
		        	response.getWriter().close();
		        	response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		        	return;
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
    		JsonArray jsonBooks = new JsonArray();
    		ArrayList<Book> mostLikedBooks = new ArrayList<Book>();
    		
    		if(books.size() >= 5) {
    			for(int i=0 ; i<5 ; i++) {
    				Book mostLikedBook = books.get(0);
        			for (Book book : books) {
            			if(mostLikedBook.getLikes().size() < book.getLikes().size()) {
            				mostLikedBook = book;
            			}
            		}
        			mostLikedBooks.add(mostLikedBook);
        			books.remove(mostLikedBook);
        		}
    		}
    		for(Book book : mostLikedBooks) {
    			jsonBooks.add(gson.toJsonTree(book));
    		}
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
