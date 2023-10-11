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
    <div>
      <div>
        <form>
          {inputList.map((value, index) => (
            <div key={index}>
              <label htmlFor="menge">Menge</label>
              <input
                type="number"
                value={value}
                min={1}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor="Einheit">Einheit</label>
              <select
                name="unity"
                id="unity"
                onChange={(e) => handleInputChange(e, index)}
                value={value}
              >
                <option value="test">test</option>
                <option value="test">test</option>
                <option value="test">test</option>
                <option value="test">test</option>
                <option value="test">test</option>
              </select>
              <label htmlFor="ingredient_name">Zutatenname</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Zutatenname"
              />
              <button onClick={() => handleRemoveField(index)}>Remove</button>
            </div>
          ))}
        </form>
        <button onClick={handleAddField}>Weitere Zutaten hinzufügen</button>
      </div>
    </div>
  );
};
