package booksForAll.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import booksForAll.general.AppConstants;
import booksForAll.general.AssistantFuncs;
import booksForAll.model.Customer;

/**
 * Servlet implementation class LoginServlet2
 */
@WebServlet(
		urlPatterns = "/LoginServlet",
		initParams = {
				@WebInitParam(name = "Username", value = ""),
				@WebInitParam(name = "Password", value = "")
		})

	public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("Username");
		String password = request.getParameter("Password");
		String result = "";
		try {
    		
        	//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();

    		Customer customer = null;
    		PreparedStatement stmt;
			try {
				stmt = conn.prepareStatement(AppConstants.SELECT_USERS_BY_NAME_PASS_STMT);
				stmt.setString(1, username);
				stmt.setString(2, password);
				ResultSet rs = stmt.executeQuery(); 
				if (rs.next()){
					customer = AssistantFuncs.CreateCustomerFromRS(rs);
					result = "Success";
				}
				else {
					result = "Failure";
				}
				rs.close();
				stmt.close();
			} catch (SQLException e) {
				getServletContext().log("Error while querying for customers", e);
	    		response.sendError(500);//internal server error
    		}

    		conn.close();
    		
    		Gson gson = new GsonBuilder().create();
        	response.addHeader("Content-Type", "application/json");
    		JsonObject json = new JsonObject();
    		json.addProperty("Result", result);
    		if(customer == null) {
    			response.getWriter().println(json.toString());
    			return ;
    		}
    		json.add("Customer", gson.toJsonTree(customer));
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
