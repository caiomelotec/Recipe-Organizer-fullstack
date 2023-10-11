import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

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
          <div key={recipe.recipe_id} className="recipe-item-div">
            <img className="recipe-img" src={recipe.imgUrl} alt="" />
            <h4>{recipe.recipe_name}</h4>
            <div className="deatils-div">
              <button className="details-btn">
                <Link id="link-details">Mehr Sehen</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
