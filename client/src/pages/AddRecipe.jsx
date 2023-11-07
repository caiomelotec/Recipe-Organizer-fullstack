// import React, { useRef } from "react";
import "../styles/AddRecipe.css";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
// import { DynamicInputs } from "../componentes/DynamicInputs";
import { RecipeStepFormControll } from "../componentes/RecipeStepFormControll";
import { AddRecipeFormErrors } from "../componentes/AddRecipeFormErrors";
import { AddRecipeFormFirstSection } from "../componentes/AddRecipeFormFirstSection";
import { AddRecipeFormSecondSection } from "../componentes/AddRecipeFormSecondSection";
import { DynamicInputs } from "../componentes/DynamicInputs";

export const AddRecipe = () => {
  const location = useLocation();
  const state = location.state;
  const isEdit = location.search.includes("edit");
  const navigate = useNavigate();
  // REACT QUILL
  const [value, setValue] = useState(isEdit ? state?.recipe_preparation : "");
  // state for ingredients
  const [inputList, setInputList] = useState(() => {
    if (isEdit && state?.ingredients) {
      return state.ingredients;
    } else {
      return [{ ingredient_name: "", unit: "", quantity: "" }];
    }
  });
  // add new input fields
  const handleAddField = () => {
    const ingredientsData = { ingredient_name: "", unit: "", quantity: "" };
    setInputList([...inputList, ingredientsData]);
  };
  // console.log("STATE LOG ingredients id:", state.ingredients[0].recipe_id);

  // recipe state
  const [recipe, setRecipe] = useState({
    recipe_name: isEdit ? state.recipe.recipe_name : "",
    imgUrl: isEdit ? state.recipe.imgUrl : "",
    portion: isEdit ? state.recipe.portion : "",
    recipe_preparation: value,
    date: moment(Date.now()).format("DD.MM.YYYY HH:mm"),
  });

  const handleInputChange = (e) => {
    const { name, value, required } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));

    // Validate required fields
    if (required && value.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessages[name],
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // add new Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the recipe preparation data from the ReactQuill editor before sending it to the server
    const updatedRecipe = { ...recipe, recipe_preparation: value };
    const requestData = { recipe: updatedRecipe, inputList };
    console.log("REQUEST DATA: ", requestData);
    try {
      state
        ? await axios.put(
            `http://localhost:4000/recipes/${state.recipe.recipe_id}`,
            { requestData },
            { withCredentials: true }
          )
        : await axios.post("http://localhost:4000/addrecipe", requestData, {
            withCredentials: true,
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // handle separation of forms
  const [formStep, setFormStep] = useState(0);

  // validation of forms
  const [formErrors, setFormErrors] = useState({
    recipe_name: "",
    recipe_preparation: "",
    portion: "",
    // Add more fields as needed
  });

  const errorMessages = {
    recipe_name: "Bitte gib einen Rezeptnamen ein.",
    recipe_preparation: "Bitte verfasse einen Zubereitungstext.",
    portion:
      "Bitte gib die Anzahl der Portionen an, für die dein Rezept ausgelegt ist.",
  };

  return (
    <div className="forms-wrapper-container">
      <div className="form-container">
        <RecipeStepFormControll formStep={formStep} setFormStep={setFormStep} />
        <div className="background-div"></div>
        <AddRecipeFormErrors formErrors={formErrors} />
        {/* form */}
        <form onSubmit={handleSubmit}>
          {formStep >= 0 && (
            // first form step
            <section
              className="section-form-one"
              style={
                formStep === 0
                  ? { display: "block" }
                  : { display: "none", position: "absolute" }
              }
            >
              <AddRecipeFormFirstSection
                recipe={recipe}
                handleInputChange={handleInputChange}
              />
              <DynamicInputs
                setInputList={setInputList}
                inputList={inputList}
              />
            </section>
          )}

          <section
            className="section-form-two"
            style={formStep === 1 ? { display: "block" } : { display: "none" }}
          >
            <AddRecipeFormSecondSection
              value={value}
              setValue={setValue}
              setFormStep={setFormStep}
              handleSubmit={handleSubmit}
            />
          </section>
        </form>
        {formStep === 0 && (
          <div className="btns-div">
            <button className="add-inputs-btn" onClick={handleAddField}>
              Weitere Zutaten hinzufügen
            </button>
            <button onClick={() => setFormStep(1)} className="step-btn">
              Weiter
            </button>
          </div>
        )}
        {formStep === 1 && (
          <button
            onClick={() => setFormStep(0)}
            className="step-btn step-back-btn"
          >
            Zurück
          </button>
        )}
      </div>
    </div>
  );
};
