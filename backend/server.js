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

app.post("/addrecipe", (req, res) => {
  const recipe = req.body.recipe; // Extract the recipe data from the request body
  const ingredients = req.body.inputList; // Extract the ingredients data from the request body

  //first, insert the recipe
  const recipeQuery = "INSERT INTO recipes (recipe_name) VALUES (?)";
  const recipeValues = [recipe.recipe_name];

  db.query(recipeQuery, recipeValues, (err, recipeResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding recipe");
    }

    //Get the ID of the inserted recipe
    const recipeId = recipeResult.insertId;
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
