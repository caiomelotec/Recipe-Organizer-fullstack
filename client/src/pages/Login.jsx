import { useState } from "react";
import { AuthForm } from "../componentes/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import Navigate if not already imported
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const notifyError = () =>
    toast.error(error, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/login", inputs, {
        withCredentials: true,
      });
      navigate("/"); // Corrected navigation
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      notifyError();
    }
  };

  return (
    <AuthForm
      title="Jetzt einloggen"
      subtitle="Jetzt einloggen"
      emailPlaceholder="Email"
      passwordPlaceholder="Passwort"
      buttonText="Einloggen"
      linkText="Du hast noch kein Koch-Konto?"
      linkTo="/register"
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
