import React from "react";

export const AddRecipe = () => {
  return (
    <div>
      <h1>Rezept eingeben</h1>
      <form>
        <label htmlFor="">Rezeptname</label>
        <input type="text" placeholder="Rezeptname" />
        <label htmlFor="">Zusätzliche Informationen</label>
        <input type="text" placeholder='z.B "vegetarisch"' />
        <label htmlFor="">Portionen</label>
        <p>
          Das Rezept ist ausgelegt für <input type="number" min={1} />
          Personen / Portionen
        </p>
        <h1>Zutaten und Mengenangaben</h1>
        <label htmlFor="Menge">Menge</label>
        <input type="number" min={0} />
        <label htmlFor="">Einheit</label>
        <select name="einheit" id="einheit">
          <option value="">Becher</option>
          <option value="">Beet/e</option>
          <option value="">Beutel</option>
          <option value="">Blatt</option>
        </select>
        <label htmlFor="">Zutatenname</label>
        <input type="text" />
        <button>Weitere Zutaten hinzufügen</button>
        <button>Rezept einreichten</button>
      </form>
    </div>
  );
};
