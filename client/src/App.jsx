import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddRecipe } from "./pages/AddRecipe.jsx";
import { Home } from "./pages/Home.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />  */}
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
