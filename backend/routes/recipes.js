const express = require("express");

const router = express.Router();

const recipesController = require("../controllers/recipes");

router.get("/recipes", recipesController.getRecipes);

router.get(
  "/recipes/:id/ingredients",
  recipesController.getIgredientsByRecipeId
);
router.get("/recipesbyuserid/:id", recipesController.fetchRecipeByUserId);

router.get("/recipes/:id", recipesController.getSingleRecipe);

router.post("/addrecipe", recipesController.AddRecipe);

router.delete("/recipes/:id", recipesController.deleteRecipeById);

module.exports = router;
