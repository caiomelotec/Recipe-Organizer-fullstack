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

app.get("/recipes", (req, res) => {
  //retriving the recipes data from the database
  const query = "SELECT * From recipes";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting recipes");
    }
    res.send(results);
  });
});

app.post("/addrecipe", (req, res) => {
  const recipe = req.body.recipe; // Extract the recipe data from the request body
  const ingredients = req.body.inputList; // Extract the ingredients data from the request body

  //first, insert the recipe
  const recipeQuery = "INSERT INTO recipes (recipe_name, imgUrl) VALUES (?, ?)";
  const recipeValues = [recipe.recipe_name, recipe.imgUrl];

  db.query(recipeQuery, recipeValues, (err, recipeResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding recipe");
    }

    //Get the ID of the inserted recipe
    const recipeId = recipeResult.insertId;

    //second, insert the ingredients data
    const ingredientQuery =
      "INSERT INTO recipes.ingredients (quantity, unit, ingredient_name, recipe_id) VALUES ?";
    const ingredientValues = ingredients.map((ingredient) => [
      ingredient.quantity,
      ingredient.unit,
      ingredient.ingredient_name,
      recipeId,
    ]);

    db.query(ingredientQuery, [ingredientValues], (err, ingredientResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error adding ingredients");
      }

      return res.send("Recipe and ingredients added successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
