package booksForAll.listeners;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.apache.tomcat.dbcp.dbcp2.BasicDataSource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import booksForAll.general.AppConstants;
import booksForAll.model.Customer;




/**
 * An example listener that reads the customer json file and populates the data into a Derby database
 */
@WebListener
public class ManageDBFromJsonFile implements ServletContextListener {

    /**
     * Default constructor. 
     */
    public ManageDBFromJsonFile() {
        // TODO Auto-generated constructor stub
    }
    
    //utility that checks whether the customer tables already exists
    private boolean tableAlreadyExists(SQLException e) {
        boolean exists;
        if(e.getSQLState().equals("X0Y32")) {
            exists = true;
        } else {
            exists = false;
        }
        return exists;
    }

	/**
     * @see ServletContextListener#contextInitialized(ServletContextEvent)
     */
    public void contextInitialized(ServletContextEvent event)  { 
    	ServletContext cntx = event.getServletContext();
    	
    	try{
    		
    		//obtain CustomerDB data source from Tomcat's context
    		Context context = new InitialContext();
    		BasicDataSource ds = (BasicDataSource)context.lookup(
    				cntx.getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.OPEN);
    		Connection conn = ds.getConnection();
    		List<String> tables = new ArrayList<String>();
    		tables.add(AppConstants.CREATE_USERS_TABLE);
    		tables.add(AppConstants.CREATE_COMMENTS_TABLE);
    		tables.add(AppConstants.CREATE_LIKES_TABLE);
    		tables.add(AppConstants.CREATE_BOOKS_TABLE);

    		for(String table : tables) {
    			boolean created = false;
        		try{
        			//create users table
        			Statement stmt = conn.createStatement();
        			//TODO: DIFFERENT CHECKS
        			stmt.executeUpdate(table);
        			//commit update
            		conn.commit();
            		stmt.close();
        		}catch (SQLException e){
        			//check if exception thrown since table was already created (so we created the database already 
        			//in the past
        			created = tableAlreadyExists(e);
        			if (!created){
        				throw e;//re-throw the exception so it will be caught in the
        				//external try..catch and recorded as error in the log
        			}
        		}
    		}
   		
    		//if no database exist in the past - further populate its records in the table
    		/*if (!created){
    			//populate customers table with customer data from json file
    			Collection<Customer> customers = loadCustomers(cntx.getResourceAsStream(File.separator +
    														   AppConstants.CUSTOMERS_FILE));
    			PreparedStatement pstmt = conn.prepareStatement(AppConstants.INSERT_USER_STMT);
    			for (Customer customer : customers){
    				pstmt.setString(1,customer.getUsername());
    				pstmt.setString(2,customer.getEmail());
    				pstmt.setString(3,customer.getAddress().getCity());
    				pstmt.setString(4,customer.getAddress().getStreet());
    				pstmt.setInt(5,customer.getAddress().getHouseNum());
    				pstmt.setString(6,customer.getAddress().getPostalCode());
    				pstmt.setString(7,customer.getAddress().getCountry());
    				pstmt.setString(8,customer.getPhoneNum());
    				pstmt.setString(9,customer.getPassword());
    				pstmt.setString(10,customer.getNickname());
    				pstmt.setString(11,customer.getDescription());
    				pstmt.setString(12,customer.getPhoto());
    				pstmt.setDouble(13,customer.getBalance());
    				pstmt.executeUpdate();
    			}

    			//commit update
    			conn.commit();
    			//close statements
    			pstmt.close();
    		}*/
    		

    		//close connection
    		conn.close();
    		
    	} catch (SQLException | NamingException e) {
    		//log error 
    		cntx.log("Error during database initialization",e);
    	}
    }

	/**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent)
     */
    public void contextDestroyed(ServletContextEvent event)  { 
    	 ServletContext cntx = event.getServletContext();
    	 
         //shut down database
    	 try {
     		//obtain CustomerDB data source from Tomcat's context and shutdown
     		Context context = new InitialContext();
     		BasicDataSource ds = (BasicDataSource)context.lookup(
     				cntx.getInitParameter(AppConstants.DB_DATASOURCE) + AppConstants.SHUTDOWN);
     		ds.getConnection();
     		ds = null;
		} catch (SQLException | NamingException e) {
			cntx.log("Error shutting down database",e);
		}

    }
    
    
    /**
	 * Loads customers data from json file that is read from the input stream into 
	 * a collection of Customer objects
	 * @param is input stream to json file
	 * @return collection of customers
	 * @throws IOException
	 */
	private Collection<Customer> loadCustomers(InputStream is) throws IOException{
		
		//wrap input stream with a buffered reader to allow reading the file line by line
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		StringBuilder jsonFileContent = new StringBuilder();
		//read line by line from file
		String nextLine = null;
		while ((nextLine = br.readLine()) != null){
			jsonFileContent.append(nextLine);
		}

		Gson gson = new Gson();
		//this is a require type definition by the Gson utility so Gson will 
		//understand what kind of object representation should the json file match
		Type type = new TypeToken<Collection<Customer>>(){}.getType();
		Collection<Customer> customers = gson.fromJson(jsonFileContent.toString(), type);
		//close
		br.close();	
		return customers;

	}
}

