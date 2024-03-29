package booksForAll.filters;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.dbcp.dbcp2.BasicDataSource;

import booksForAll.general.AppConstants;

/**
 * Servlet Filter implementation class AdminAuthenticationFilter
 */
@WebFilter({
	"/AdminReplyMessageServlet",
	"/AllAdminMessagesServlet",
	"/AllAdminRepliedMessagesServlet",
	"/AllAdminUnrepliedMessagesServlet",
	"/AllTransactionsServlet",
	"/AllUnapprovedCommentsServlet",
	"/AllUsersServlet",
	"/ApproveCommentServlet",
	"/DeleteCommentServlet",
	"/RemoveUserServlet",
	"/UnapproveCommentServlet",
	"/UserServlet",
	"/TopFiveActiveUsersServlet"
	})
public class AdminAuthenticationFilter implements Filter {
	public FilterConfig globalConfig;

    /**
     * Default constructor. 
     */
    public AdminAuthenticationFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	//Filter that checks if an admin session exists, and only then proceeds with the query. 
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpSession session = ((HttpServletRequest)request).getSession(false);
		if(session == null) {
			return;
		}
		String username = (String)session.getAttribute("Username");
		String password = (String)session.getAttribute("Password");
		
		//obtain CustomerDB data source from Tomcat's context
		Context context;
		try {
			context = new InitialContext();
			BasicDataSource ds = (BasicDataSource)context.lookup(
					globalConfig.getServletContext().getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
			Connection conn = ds.getConnection();
    		PreparedStatement stmt = conn.prepareStatement(AppConstants.SELECT_USERS_BY_NAME_PASS_STMT);
			stmt.setString(1, username);
			stmt.setString(2, password);
			ResultSet rs = stmt.executeQuery(); 
			if (rs.next() && username.equals("admin")){
				chain.doFilter(request, response);
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		globalConfig = fConfig;
	}

}
