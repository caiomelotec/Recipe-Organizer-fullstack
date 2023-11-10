const express = require("express");

const router = express.Router();

const recipesController = require("../controllers/recipes");

const multer = require("multer");

router.get("/recipes", recipesController.getRecipes);

router.get(
  "/recipes/:id/ingredients",
  recipesController.getIgredientsByRecipeId
);
router.get("/recipesbyuserid/:id", recipesController.fetchRecipeByUserId);

router.get("/recipes/:id", recipesController.getSingleRecipe);

router.post("/addrecipe", recipesController.AddRecipe);

router.delete("/recipes/:id", recipesController.deleteRecipeById);

router.put("/recipes/:id", recipesController.editRecipe);

// UPLOAD USER IMG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/uploadrecipeimg",
  upload.single("file"),
  recipesController.uploadRecipeImg
);

module.exports = router;
