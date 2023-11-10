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

    return res.status(200).json(data);
  });
};

exports.getSingleRecipe = (req, res) => {
  const queryR =
    "SELECT recipes.recipe_id, recipes.recipe_name, recipes.imgUrl, recipes.recipe_preparation, recipes.portion, recipes.uid, recipes.date, users.img AS user_img, users.firstname, users.lastname, users.id " +
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

exports.editRecipe = (req, res) => {
  const requestData = req.body.requestData; // Extract data from the request

  const token = req.cookies.token;

  if (!token) return res.status(401).json("Not Auth");

  jwt.verify(token, process.env.JWTKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const recipeId = req.params.id;

    const recipeQuery =
      "UPDATE recipes SET `recipe_name` = ?, `imgUrl` = ?, `recipe_preparation` = ?, `portion` = ? WHERE `recipe_id` = ? AND `uid` = ?";

    const recipeValues = [
      requestData.recipe.recipe_name,
      requestData.recipe.imgUrl,
      requestData.recipe.recipe_preparation,
      requestData.recipe.portion,
      recipeId,
      userInfo.id,
    ];

    db.query(recipeQuery, recipeValues, (err, recipeResults) => {
      if (err) return res.status(500).json("Error updating recipe");

      // Separate existing ingredients and new ingredients
      const existingIngredients = [];
      const newIngredients = [];

      requestData.inputList.forEach((ingredient) => {
        if (ingredient.ingredient_id) {
          existingIngredients.push(ingredient);
        } else {
          newIngredients.push(ingredient);
        }
      });

      // Update existing ingredients
      const ingredientsQuery =
        "UPDATE recipes.ingredients SET `quantity` = ?, `unit` = ?, `ingredient_name` = ? WHERE `ingredient_id` = ? AND `recipe_id` = ?";

      existingIngredients.forEach((ingredient) => {
        db.query(
          ingredientsQuery,
          [
            ingredient.quantity,
            ingredient.unit,
            ingredient.ingredient_name,
            ingredient.ingredient_id, // Use the ingredient ID to uniquely identify the ingredient
            recipeId, // The recipe ID is used as a condition
          ],
          (err, ingredientResults) => {
            if (err)
              return res
                .status(500)
                .json("Error updating existing ingredients");
          }
        );
      });

      // deleting ingredients that is not in the InputList

      const query =
        "SELECT ingredient_id FROM recipes.ingredients WHERE recipe_id = ?";

      db.query(query, [recipeId], (err, existingIngredients) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error retrieving ingredients data");
        }
        // get all existing ingredients that has the same recipe_id foreign key
        const existingIngredientIds = existingIngredients.map(
          (ingredient) => ingredient.ingredient_id
        );
        // get the existing ingredients inside inputList and keep it
        const ingredientsToKeep = requestData.inputList.map(
          (ingredient) => ingredient.ingredient_id
        );
        // calculates the ingredients to delete by using the filter function on the existingIngredientIds array.
        // It iterates over each ingredientId in the existingIngredientIds array and checks whether that ingredientId is not included in the ingredientsToKeep array. If an ingredientId is not present in the ingredientsToKeep array, it means the ingredient should be deleted.
        const ingredientsToDelete = existingIngredientIds.filter(
          (ingredientId) => !ingredientsToKeep.includes(ingredientId)
        );

        if (ingredientsToDelete.length > 0) {
          const deleteQuery =
            "DELETE FROM recipes.ingredients WHERE recipe_id = ? AND ingredient_id IN (?)";

          db.query(
            deleteQuery,
            [recipeId, ingredientsToDelete],
            (err, deleteResult) => {
              if (err) {
                console.error(err);
                return res.status(500).json("Error deleting ingredients");
              }

              console.log(
                "Deleted ingredients with IDs: ",
                ingredientsToDelete
              );
            }
          );
        }
      });

      // Insert new ingredients
      if (newIngredients.length > 0) {
        const insertQuery =
          "INSERT INTO recipes.ingredients (quantity, unit, ingredient_name, recipe_id) VALUES ?";

        const newIngredientValues = newIngredients.map((ingredient) => [
          ingredient.quantity,
          ingredient.unit,
          ingredient.ingredient_name,
          recipeId,
        ]);

        db.query(insertQuery, [newIngredientValues], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Error inserting new ingredients");
          }

          console.log("New ingredients inserted successfully");
        });
      }

      return res
        .status(200)
        .json("Recipe and ingredients updated successfully");
    });
  });
};

exports.deleteRecipeById = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWTKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const recipeId = req.params.id;

    const deleteQuery = "DELETE FROM recipes WHERE recipe_id = ? AND uid = ?";

    db.query(deleteQuery, [recipeId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("Error by deleting the recipe");

      if (data.affectedRows === 0) {
        return res
          .status(403)
          .json("You can't delete a recipe that doesn't belong to you.");
      }

      return res.status(200).json("Recipe has been deleted!");
    });
  });
};

exports.uploadRecipeImg = (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
};
