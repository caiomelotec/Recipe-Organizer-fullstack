import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="forms-wrapper-container">
      <div className="form-container">
        <div className="background-div"></div>
        <form>
          <label>Rezeptname</label>
          <input
            type="text"
            placeholder="Rezeptname"
            name="recipe_name"
            id="recipe_name"
            onChange={handleInputChange}
          />
          <label>Imag URL</label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            onChange={handleInputChange}
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
              />
              <select
                name="unit"
                id="unit"
                onChange={(e) => handleInputChangeUnit(e, index)}
                value={ingredient.unit}
                className="unity-select"
              >
                <option value="">keine Einheit</option>
                <option value="Becher">Becher</option>
                <option value="Beet/e">Beet/e</option>
                <option value="Beutel">Beutel</option>
                <option value="Blatt">Blatt</option>
                <option value="Blätter">Blätter</option>
                <option value="Bund">Bund</option>
                <option value="Bündel">Bündel</option>
                <option value="cl">cl</option>
                <option value="cm">cm</option>
                <option value="dicke">dicke</option>
                <option value="dl">dl</option>
                <option value="Dose">Dose</option>
                <option value="dünne">dünne</option>
                <option value="Ecke(n)">Ecke(n)</option>
                <option value="Eimer">Eimer</option>
                <option value="einige">einige</option>
                <option value="einige Stiele">einige Stiele</option>
                <option value="g">g</option>
                <option value="große">große</option>
                <option value="ml">ml</option>
                <option value="EL">EL</option>
                <option value="Stück(e)">Stück(e)</option>
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
          <button
            type="submit"
            className="add-inputs-btn"
            onClick={handleSubmit}
          >
            Rezept einreichen
          </button>
        </form>
        <button className="add-inputs-btn" onClick={handleAddField}>
          Weitere Zutaten hinzufügen
        </button>
      </div>
    </div>
  );
};
