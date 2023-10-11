import React from "react";
import { useState } from "react";

export const AddRecipe = () => {
  const [inputList, setInputList] = useState([""]);

  const handleInputChange = (e, index) => {
    const newList = [...inputList];
    newList[index] = e.target.value;
    setInputList(newList);
  };
  const handleAddField = () => {
    setInputList([...inputList, ""]);
  };
  const handleRemoveField = (index) => {
    if (inputList.length > 1) {
      const newList = [...inputList];
      newList.splice(index, 1);
      setInputList(newList);
    }
  };
  return (
    <div className="forms-wrapper-container">
      <div className="form-container">
        <form>
          <div className="dynamic-inputstitle-div">
            <p className="menge-title">Menge</p>
            <p>Einheit</p>
            <p>Zutatenname </p>
          </div>
          {inputList.map((value, index) => (
            <div key={index} className="dynamic-inputs-div">
              <input
                type="number"
                value={value}
                min={1}
                onChange={(e) => handleInputChange(e, index)}
              />
              <select
                name="unity"
                id="unity"
                onChange={(e) => handleInputChange(e, index)}
                value={value}
                className="unity-select"
              >
                <option value="test">Becher</option>
                <option value="test">Beet/e</option>
                <option value="test">Beutel</option>
                <option value="test">Blatt</option>
                <option value="test">Blätter</option>
                <option value="test">Bund</option>
                <option value="test">Bündel</option>
                <option value="test">cl</option>
                <option value="test">cm</option>
                <option value="test">dicke</option>
                <option value="test">dl</option>
                <option value="test">Dose</option>
                <option value="test">dünne</option>
                <option value="test">Ecke(n)</option>
                <option value="test">Eimer</option>
                <option value="test">einige</option>
                <option value="test">einige Stiele</option>
              </select>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Zutatenname"
              />
              <button
                className="remove-inputs-btn"
                onClick={() => handleRemoveField(index)}
              >
                Löschen
              </button>
            </div>
          ))}
        </form>
        <button className="add-inputs-btn" onClick={handleAddField}>
          Weitere Zutaten hinzufügen
        </button>
      </div>
    </div>
  );
};
