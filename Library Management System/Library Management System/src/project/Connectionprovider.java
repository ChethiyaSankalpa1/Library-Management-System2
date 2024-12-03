package project;
import java.sql.Connection;
import java.sql.DriverManager;

public class Connectionprovider {
    private static final String URL = "jdbc:mysql://localhost:3306/lms";
    private static final String USER = "root";
    private static final String PASSWORD = "1234";
    
     public static Connection getCon() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            System.err.println("Database connection error: " + e.getMessage());
            return null;
        }
    }
}
