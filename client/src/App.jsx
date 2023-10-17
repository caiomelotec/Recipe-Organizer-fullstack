import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddRecipe } from "./pages/AddRecipe.jsx";
import { Home } from "./pages/Home.jsx";
import { RecipeDetails } from "./pages/RecipeDetails.jsx";
import { Header } from "./componentes/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
