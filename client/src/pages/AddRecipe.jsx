// import React, { useRef } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const AddRecipe = () => {
  const createEmptyIngredient = () => ({
    ingredient_name: "",
    unit: "",
    quantity: "",
  });

  const [inputList, setInputList] = useState([createEmptyIngredient()]);
  const [recipe, setRecipe] = useState({ recipe_name: "", imgUrl: "" });

  const handleInputChange = (e) => {
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const requestData = { recipe, inputList };
      await axios.post("http://localhost:4000/addrecipe", requestData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(inputList);

  const unitsArray = [
    "keine Einheit",
    "Becher",
    "Beet/e",
    "Beutel",
    "Blatt",
    "Blätter",
    "Bund",
    "Bündel",
    "cl",
    "cm",
    "dicke",
    "dl",
    "Dose",
    "dünne",
    "Ecke(n)",
    "Eimer",
    "einige",
    "einige Stiele",
    "EL",
    "EL gehäuft",
    "EL gestr",
    "etwas",
    "evtl",
    "extra",
    "Fässchchen",
    "Fläschen",
    "Flasche",
    "Flaschen",
    "g",
    "Glas",
    "Gläser",
    "gr. Dose/n",
    "gr. Gläser",
    "gr. Kopf",
    "gr. Scheibe(n)",
    "gr. Stück(e)",
    "große",
    "großen",
    "großer",
    "großes",
    "halbe",
    "Halm(e)",
    "Handvoll",
    "Kästchen",
    "kg",
    "kl. Bund",
    "kl. Dose/n",
    "kl. Glas",
    "kl. Gläser",
    "kl. Kopf",
    "kl. Scheibe(n)",
    "kl. Stück",
    "kleine",
    "kleiner",
    "kleines",
    "Knolle/n",
    "Kopf",
    "Köpfe",
    "Körner",
    "Kugel",
    "Kugel/n",
    "Kugeln",
    "kg",
    "Liter",
    "m,-große",
    "m,-großer",
    "m,-großes",
    "mehr",
    "mg",
    "ml",
    "Msp.",
    "n. B",
    "Paar",
    "Paket",
    "Pck",
    "Pkt",
    "Platte/n",
    "Port",
    "Prise(n)",
    "Prisen",
    "Prozent %",
    "Riegel",
    "Ring/e",
    "Rippe/n",
    "Rispe(n)",
    "Rolle",
    "Schälchen",
    "Scheibe/n",
    "Schuss",
    "Spritzer",
    "Stange/n",
    "Stängel",
    "Staude(n)",
    "Stick(s)",
    "Stiel/e",
    "Stiele",
    "Streifen",
    "Stück(e)",
    "Tablette(n)",
    "Tafel",
    "Tafeln",
    "Tasse",
    "Tasse/n",
    "Teil/e",
    "TL",
    "TL, gehäuft",
    "TL, gestr",
    "Topft",
    "Tropfen",
    "Tube/n",
    "viel",
    "wenig",
    "Würfel",
    "Wurzel",
    "Wurzel/n",
    "Zehe/n",
    "Zweig/e",
  ];

  // handle separation of forms
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    setFormStep((prev) => prev + 1);
  };
  const backFormStep = () => {
    setFormStep((prev) => prev - 1);
  };
  // react hook form
  const {
    isValid,
    watch,
    register,
    formState: {
      errors,
      // touchedFields,
    },
  } = useForm({ mode: "all" });
  // const ref = useRef(null);
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
          >
            2️⃣ Zubereitung
          </button>
        </div>
        <div className="background-div"></div>
        {/* form */}
        <form>
          {formStep >= 0 && (
            <section
              className="section-form-one"
              style={
                formStep === 0
                  ? { display: "block" }
                  : { visibility: "hidden", position: "absolute" }
              }
            >
              <label>Rezeptname</label>
              <input
                type="text"
                placeholder="Rezeptname"
                name="recipe_name"
                id="recipe_name"
                onChange={handleInputChange}
                {...register("recipe_name", {
                  required: {
                    value: true,
                    message: "Bitte geben Sie einen Rezeptname ein",
                  },
                })}
              />
              {errors.recipe_name && (
                <p style={{ color: "black" }}>{errors.recipe_name.message}</p>
              )}
              <label>Image URL</label>
              <input
                type="text"
                name="imgUrl"
                id="imgUrl"
                onChange={handleInputChange}
                {...register("imgUrl", { required: true })}
              />
              <div className="dynamic-inputstitle-div">
                <p className="menge-title">Menge</p>
                <p>Einheit</p>
                <p>Zutatenname</p>
              </div>
              {inputList.map((ingredient, index) => (
                <div key={index} className="dynamic-inputs-div">
                  <input
                    type="number"
                    value={ingredient.quantity}
                    min={1}
                    name="quantity"
                    id="quantity"
                    onChange={(e) => handleInputChangeQuantity(e, index)}
                    // {...register("quantity", { required: true })} // Use register here
                  />
                  <select
                    name="unit"
                    id="unit"
                    onChange={(e) => handleInputChangeUnit(e, index)}
                    value={ingredient.unit}
                    className="unity-select"
                    // {...register("unit", { required: true })}
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
                    // {...register("ingredient_name", { required: true })}
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

          {formStep >= 1 && (
            <section
              className="section-form-two"
              style={
                formStep === 1 ? { display: "block" } : { visibility: "hidden" }
              }
            >
              <div className="recipe-preparation-div">
                <h5>Rezeptzubereitung</h5>
                <p>
                  Hier kannst du beschreiben, welche Schritte für die
                  Zubereitung des Rezeptes notwendig sind. Bitte achte darauf,
                  dass alle relevanten Informationen enthalten sind, z.B.
                  Angaben zur Temperatur des Backofens und dass alle von dir
                  aufgeführten Zutaten enthalten sind
                </p>
                <textarea
                  name="recipe_preparation"
                  id="recipe_preparation"
                  cols="100"
                  rows="8"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <button onClick={backFormStep} className="step-btn">
                  Zurück
                </button>
                <button
                  type="submit"
                  className="add-inputs-btn"
                  onClick={handleSubmit}
                >
                  Rezept einreichen
                </button>
              </div>
            </section>
          )}
        </form>
        {formStep === 0 && (
          <div>
            <button className="add-inputs-btn" onClick={handleAddField}>
              Weitere Zutaten hinzufügen
            </button>
            <button onClick={completeFormStep} className="step-btn">
              Weiter
            </button>
          </div>
        )}
      </div>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};
