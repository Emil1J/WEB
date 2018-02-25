package booksForAll.servlets;

import java.io.BufferedReader;
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

import booksForAll.filters.PostData;
import booksForAll.general.AppConstants;
import booksForAll.general.AssistantFuncs;
import booksForAll.model.Book;
import booksForAll.model.Comment;
import booksForAll.model.Like;

/**
 * Servlet implementation class UserBooksServlet
 */
@WebServlet(
		urlPatterns = "/UserBooksServlet",
		initParams = {
				@WebInitParam(name = "Username", value = "")
		})
	//User and admin can user this query to get the user books.
	public class UserBooksServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserBooksServlet() {
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
    		ArrayList<Book> books = new ArrayList<Book>();
    		List<Like> likes = new ArrayList<Like>();
    		List<Comment> comments = new ArrayList<Comment>();
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_PURCHASED_BY_USER_STMT);
				stmt.setString(1, username);
				ResultSet rs = stmt.executeQuery(); 
				result = "Success";
				while (rs.next()){
					stmt = conn.prepareStatement(AppConstants.SELECT_BOOK_BY_NAME_STMT);
					stmt.setString(1, rs.getString(3));
					ResultSet resSet = stmt.executeQuery(); 
					if(resSet.next()) {
						books.add(AssistantFuncs.CreateBookFromRS(resSet));
					}
				}
				if(books.isEmpty()) {
					result = "No Books";
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
    		JsonArray jsonBooks = new JsonArray();
    		for (Book book : books) {
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

}
