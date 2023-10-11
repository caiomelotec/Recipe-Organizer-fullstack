import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const RecipeDetails = () => {
  const location = useLocation();
  const recipeId = location.pathname.split("/")[2];

  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchingRecipeData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/recipes`);
        setRecipe(response.data);
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

  console.log(ingredients);
  return <div>RecipeDetails</div>;
};
