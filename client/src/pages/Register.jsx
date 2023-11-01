import { useState } from "react";
import { AuthForm } from "../componentes/AuthForm";

export const Register = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    />
  );
};
