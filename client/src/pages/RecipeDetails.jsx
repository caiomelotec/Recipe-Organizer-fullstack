import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const RecipeDetails = () => {
  const location = useLocation();
  const recipeId = location.pathname.split("/")[2];

  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchingRecipeData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/recipes`);
        setRecipes(response.data);
      } catch (err) {
        console.error(err, "Error fetching the recipe data");
      }
    };
    fetchingRecipeData();
  }, []);

  useEffect(() => {
    const fetchingIngredientsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/${recipeId}/ingredients`
        );
        setIngredients(response.data);
      } catch (err) {
        console.error(err, "Error fetching the ingredients data");
      }
    };
    fetchingIngredientsData();
  }, []);

  const recipe = recipes.find((recipe) => recipe.recipe_id == recipeId); // single

  if (!recipe) {
    return <div>Loading...</div>; // render the loading component if project is not found
  }
  // console.log(recipe);

  // console.log(recipeId);
  console.log(ingredients);
  return (
    <div>
      <div>
        <h1>{recipe.recipe_name}</h1>
        <img src={recipe.imgUrl} alt="" />
        {ingredients.map((ingredient) => (
          <div
            className="ingredients-div-container"
            key={ingredient.ingredient_id}
          >
            <div className="ingredient-item-div">
              <p>{ingredient.quantity}</p>
              <p>{ingredient.unit}</p>
              <p>{ingredient.ingredient_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
