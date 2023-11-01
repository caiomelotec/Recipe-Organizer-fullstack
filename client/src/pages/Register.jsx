import { useState } from "react";
import { AuthForm } from "../componentes/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/register", inputs, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <AuthForm
      title="Neues Konto erstellen"
      emailPlaceholder="Email"
      passwordPlaceholder="Passwort"
      buttonText="Konto erstellen"
      linkText="Du hast bereits ein Koch-Konto?"
      linkTo="/login"
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};
