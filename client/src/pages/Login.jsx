import { useState } from "react";
import { AuthForm } from "../componentes/AuthForm";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

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
    />
  );
};
