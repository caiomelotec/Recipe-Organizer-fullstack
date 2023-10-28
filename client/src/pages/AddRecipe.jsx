// import React, { useRef } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import unitsArray from "../data";

export const AddRecipe = () => {
  // REACT QUILL
  const [value, setValue] = useState(null);

  console.log(value);

  const createEmptyIngredient = () => ({
    ingredient_name: "",
    unit: "",
    quantity: "",
  });

  const [inputList, setInputList] = useState([createEmptyIngredient()]);
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

  const handleInputIngredientNameChange = (e, index) => {
    const newList = [...inputList];
    newList[index].ingredient_name = e.target.value;
    setInputList(newList);
  };
  const handleInputChangeQuantity = (e, index) => {
    const newList = [...inputList];
    newList[index].quantity = e.target.value;
    setInputList(newList);
  };
  const handleInputChangeUnit = (e, index) => {
    const newList = [...inputList];
    newList[index].unit = e.target.value;
    setInputList(newList);
  };
  const handleAddField = () => {
    setInputList([...inputList, createEmptyIngredient()]);
  };
  const handleRemoveField = (index) => {
    if (inputList.length > 1) {
      const newList = [...inputList];
      newList.splice(index, 1);
      setInputList(newList);
    }
  };

  const navigate = useNavigate();

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
  // console.log(inputList);

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

  // console.log(recipe);

  return (
    <div className="forms-wrapper-container">
      <div className="form-container">
        <div className="recipe-steps-div">
          <h2>Rezept eingeben</h2>
          <button
            style={
              formStep === 0
                ? { backgroundColor: "rgb(217, 48, 18)", color: "white" }
                : null
            }
            className="steps-btn"
            onClick={() => setFormStep(0)}
          >
            1️⃣ Rezept
          </button>
          <button
            style={
              formStep === 1
                ? { backgroundColor: "rgb(217, 48, 18)", color: "white" }
                : null
            }
            className="steps-btn"
            onClick={() => setFormStep(1)}
          >
            2️⃣ Zubereitung
          </button>
        </div>
        <div className="background-div"></div>
        {/* form */}
        <div className="errorMessages-divs">
          {formErrors.recipe_name && <span>{formErrors.recipe_name}</span>}
          {formErrors.recipe_preparation && (
            <span>{formErrors.recipe_preparation}</span>
          )}
          {formErrors.portion && <span>{formErrors.portion}</span>}
        </div>
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
              {inputList.map((ingredient, index) => (
                <div key={index} className="dynamic-inputs-div">
                  <input
                    type="text"
                    value={ingredient.quantity}
                    name="quantity"
                    id="quantity"
                    onChange={(e) => handleInputChangeQuantity(e, index)}
                  />
                  <select
                    name="unit"
                    id="unit"
                    onChange={(e) => handleInputChangeUnit(e, index)}
                    value={ingredient.unit}
                    className="unity-select"
                  >
                    {unitsArray.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={ingredient.ingredient_name}
                    onChange={(e) => handleInputIngredientNameChange(e, index)}
                    placeholder="Zutatenname"
                    name="ingredient_name"
                    id="ingredient_name"
                  />
                  {inputList.length > 1 && (
                    <button
                      className="remove-inputs-btn"
                      onClick={() => handleRemoveField(index)}
                    >
                      Löschen
                    </button>
                  )}
                </div>
              ))}
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
