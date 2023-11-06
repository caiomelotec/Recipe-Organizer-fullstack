import React from "react";
import unitsArray from "../data";

// Function to generate a random unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

export const DynamicInputs = ({ inputList, setInputList }) => {
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

  const handleInputIngredientNameChange = (e, index) => {
    const newList = [...inputList];
    newList[index].ingredient_name = e.target.value;
    setInputList(newList);
  };

  const handleRemoveField = (index) => {
    if (inputList.length > 1) {
      const newList = [...inputList];
      newList.splice(index, 1);
      setInputList(newList);
    }
  };

  return (
    <>
      {inputList.map((ingredient, index) => (
        <div key={generateUniqueId()} className="dynamic-inputs-div">
          <input
            type="text"
            value={ingredient.quantity}
            name="quantity"
            id="quantity"
            placeholder="Menge"
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
    </>
  );
};
