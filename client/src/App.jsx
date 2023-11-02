import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddRecipe } from "./pages/AddRecipe.jsx";
import { Home } from "./pages/Home.jsx";
import { RecipeDetails } from "./pages/RecipeDetails.jsx";
import { Header } from "./componentes/Header";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
