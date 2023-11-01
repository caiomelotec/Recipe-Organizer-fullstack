const db = require("../util/database");

exports.getRecipes = (req, res) => {
  //retriving the recipes data from the database
  const query = "SELECT * From recipes";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting recipes");
    }
    res.send(results);
  });
};

exports.getIgredientsByRecipeId = (req, res) => {
  //retriving the ingredients data from the database
  const recipeId = req.params.id;
  const query = "SELECT * From recipes.ingredients WHERE recipe_id = ?";

  db.query(query, [recipeId], (err, ingredients) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving ingredients data");
    }

    return res.send(ingredients);
  });
};

exports.AddRecipe = (req, res) => {
  const recipe = req.body.recipe; // Extract the recipe data from the request body
  const ingredients = req.body.inputList; // Extract the ingredients data from the request body

  //first, insert the recipe
  const recipeQuery =
    "INSERT INTO recipes (recipe_name, imgUrl, recipe_preparation, portion) VALUES (?, ?, ?, ?)";
  const recipeValues = [
    recipe.recipe_name,
    recipe.imgUrl,
    recipe.recipe_preparation,
    recipe.portion,
  ];
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
};
