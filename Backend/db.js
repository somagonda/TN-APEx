const mysql = require("mysql2/promise");
require("dotenv").config();

const con = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createPool(con);

// Using createPool instead of createConnection for better scalability

connection
  .getConnection()
  .then((conn) => {
    console.log("Connected to MySQL database");
    conn.release(); // Release the connection when done
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    throw err;
  });

module.exports = connection;
