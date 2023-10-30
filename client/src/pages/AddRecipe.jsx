// import React, { useRef } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { DynamicInputs } from "../componentes/DynamicInputs";
import { RecipeStepFormControll } from "../componentes/RecipeStepFormControll";
import { AddRecipeFormErrors } from "../componentes/AddRecipeFormErrors";

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
            <section
              className="section-form-one"
              style={
                formStep === 0
                  ? { visibility: "visible" }
                  : { visibility: "hidden", position: "absolute" }
              }
            >
              <div className="recipe-name">
                <label>Rezeptname</label>
                <input
                  type="text"
                  placeholder="Rezeptname"
                  name="recipe_name"
                  id="recipe_name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="img-url">
                <label>Image URL</label>
                <input
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  onChange={handleInputChange}
                />
              </div>
              <div className="portion">
                <label>Portionen</label>
                <div className="portion-info-div">
                  <span>Das Rezept ist ausgelegt für</span>
                  <input
                    min={0}
                    type="number"
                    name="portion"
                    id="portion"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Personen / Portionen.</span>
                </div>
              </div>
              <div className="dynamic-inputstitle-div">
                <p className="menge-title">Menge</p>
                <p className="einheit-title">Einheit</p>
                <p>Zutatenname</p>
              </div>
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
            <div className="recipe-preparation-div">
              <h5>Rezeptzubereitung</h5>
              <p>
                Hier kannst du beschreiben, welche Schritte für die Zubereitung
                des Rezeptes notwendig sind. Bitte achte darauf, dass alle
                relevanten Informationen enthalten sind, z.B. Angaben zur
                Temperatur des Backofens und dass alle von dir aufgeführten
                Zutaten enthalten sind
              </p>
              <div className="editor-container">
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  name="recipe_preparation"
                  id="recipe_preparation"
                  className="editor"
                  required
                />
              </div>
            </div>
            <div className="btns-div">
              <button onClick={backFormStep} className="step-btn">
                Zurück
              </button>
              <button
                type="submit"
                className="handle-submit-btn"
                onClick={handleSubmit}
              >
                Rezept einreichen
              </button>
            </div>
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
