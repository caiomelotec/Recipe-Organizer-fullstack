const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 4000;
require("dotenv").config();
// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "recipes",
});

app.use(express.json()); // to support JSON-encoded bodies
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
