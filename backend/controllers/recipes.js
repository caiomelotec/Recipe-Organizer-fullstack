const db = require("../util/database");
var jwt = require("jsonwebtoken");

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

exports.fetchRecipeByUserId = (req, res) => {
  const query =
    "SELECT r.recipe_id, r.recipe_name, r.imgUrl, r.date " +
    "FROM recipes r " +
    "WHERE r.uid = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

exports.getSingleRecipe = (req, res) => {
  const queryR =
    "SELECT recipes.recipe_name, recipes.imgUrl, recipes.recipe_preparation, recipes.portion, recipes.uid, recipes.date, users.img AS user_img, users.firstname, users.lastname, users.id " +
    "FROM users " +
    "JOIN recipes ON users.id = recipes.uid " +
    "WHERE recipes.recipe_id = ?";

  db.query(queryR, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
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
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWTKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const recipe = req.body.recipe; // Extract the recipe data from the request body
    const ingredients = req.body.inputList; // Extract the ingredients data from the request body

    //first, insert the recipe
    const recipeQuery =
      "INSERT INTO recipes (recipe_name, imgUrl, recipe_preparation, portion, date, uid) VALUES (?, ?, ?, ?, ?, ?)";
    const recipeValues = [
      recipe.recipe_name,
      recipe.imgUrl,
      recipe.recipe_preparation,
      recipe.portion,
      recipe.date,
      userInfo.id,
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
  });
};
