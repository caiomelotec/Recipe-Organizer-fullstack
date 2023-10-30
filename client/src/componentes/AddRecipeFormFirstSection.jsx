import React from "react";

export const AddRecipeFormFirstSection = ({ handleInputChange }) => {
  return (
    <>
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
    </>
  );
};
