require("dotenv").config();
// DB Connection
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
