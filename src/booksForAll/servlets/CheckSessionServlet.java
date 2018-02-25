package booksForAll.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;

/**
 * Servlet implementation class CheckSessionServlet
 */
@WebServlet("/CheckSessionServlet")
//This class is used to check if a session exists, for both user and admin.
public class CheckSessionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CheckSessionServlet() {
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
        HttpSession session=request.getSession(false);  
        String result = "Success";
        if(session == null) {
        	result = "Failure";
        }
		JsonObject json = new JsonObject();
		json.addProperty("Result", result);
    	response.getWriter().println(json.toString());
    	response.getWriter().close();
    	response.setStatus(HttpServletResponse.SC_OK);
	}

}
