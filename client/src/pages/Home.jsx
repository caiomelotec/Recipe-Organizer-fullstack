import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err, "Error fetching the recipes");
      }
    };
    fetchRecipes();
  }, []);
  console.log(recipes);
  return (
    <div className="recipes-wrapper-container">
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h1>{recipe.recipe_name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
