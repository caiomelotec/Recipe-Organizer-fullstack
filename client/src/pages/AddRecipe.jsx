// import React, { useRef } from "react";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { DynamicInputs } from "../componentes/DynamicInputs";
import { RecipeStepFormControll } from "../componentes/RecipeStepFormControll";
import { AddRecipeFormErrors } from "../componentes/AddRecipeFormErrors";
import { AddRecipeFormFirstSection } from "../componentes/AddRecipeFormFirstSection";
import { AddRecipeFormSecondSection } from "../componentes/AddRecipeFormSecondSection";

export const AddRecipe = () => {
  const navigate = useNavigate();
  // REACT QUILL
  const [value, setValue] = useState(null);

  const createEmptyIngredient = () => ({
    ingredient_name: "",
    unit: "",
    quantity: "",
  });
  const [inputList, setInputList] = useState([createEmptyIngredient()]);
  // add new input fields
  const handleAddField = () => {
    setInputList([...inputList, createEmptyIngredient()]);
  };

  // recipe state
  const [recipe, setRecipe] = useState({
    recipe_name: "",
    imgUrl: "",
    portion: "",
    recipe_preparation: value,
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
    try {
      // Update the recipe preparation data from the ReactQuill editor before sending it to the server
      const updatedRecipe = { ...recipe, recipe_preparation: value };
      const requestData = { recipe: updatedRecipe, inputList };
      await axios.post("http://localhost:4000/addrecipe", requestData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // handle separation of forms
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    setFormStep((prev) => prev + 1);
  };
  const backFormStep = () => {
    setFormStep((prev) => prev - 1);
  };

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
        <form>
          {formStep >= 0 && (
            // first form step
            <section
              className="section-form-one"
              style={
                formStep === 0
                  ? { visibility: "visible" }
                  : { visibility: "hidden", position: "absolute" }
              }
            >
              <AddRecipeFormFirstSection
                handleInputChange={handleInputChange}
              />
              <DynamicInputs
                inputList={inputList}
                setInputList={setInputList}
              />
            </section>
          )}

          <section
            className="section-form-two"
            style={
              formStep === 1
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <AddRecipeFormSecondSection
              value={value}
              setValue={setValue}
              backFormStep={backFormStep}
              handleSubmit={handleSubmit}
            />
          </section>
        </form>
        {formStep === 0 && (
          <div className="btns-div">
            <button className="add-inputs-btn" onClick={handleAddField}>
              Weitere Zutaten hinzufügen
            </button>
            <button onClick={completeFormStep} className="step-btn">
              Weiter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
