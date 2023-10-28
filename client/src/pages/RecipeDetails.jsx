import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RecipeDetails.css";
import DOMPurify from "dompurify";

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

  return (
    <div className="detail-container-wrapper" style={{ marginBottom: "2rem" }}>
      <section className="detail-container">
        <h1 className="title-detail-page">{recipe.recipe_name}</h1>
        <img src={recipe.imgUrl} alt="" className="detail-page-img" />
        <div className="share-div">
          <button className="btn-detail-page">Teilen</button>
        </div>
        <div className="preparation-info-div">
          <p>60 Min.</p>
          <p>normal</p>
          <p>888 kcal</p>
        </div>
        <div className="ingredients-wrapper-div">
          {ingredients.map((ingredient, index) => (
            <div
              className="ingredients-div-container"
              key={ingredient.ingredient_id}
            >
              <div
                className={
                  index % 2 === 0
                    ? "ingredient-item-div-active"
                    : "ingredient-item-div"
                }
              >
                <div className="div-quantity">{ingredient.quantity}</div>
                <div className="div-unit">{ingredient.unit}</div>
                <div className="p-ingredient-name">
                  {ingredient.ingredient_name}
                </div>
              </div>
            </div>
          ))}
          <button className="btn-detail-page">
            Auf die Einkaufsliste setzen
          </button>
        </div>
        <section className="detail-container-section-two">
          <h1 className="second-section-detail-title">Zubereitung</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.recipe_preparation),
            }}
          ></p>
        </section>
      </section>
    </div>
  );
};
