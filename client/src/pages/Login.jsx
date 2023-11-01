import React from "react";
import "../styles/Login.css";
import { AuthForm } from "../componentes/AuthForm";

export const Login = () => {
  return (
    <AuthForm
      title="Jetzt einloggen"
      subtitle="Jetzt einloggen"
      emailPlaceholder="Email"
      passwordPlaceholder="Passwort"
      buttonText="Einloggen"
      linkText="Du hast noch kein Koch-Konto?"
      linkTo="/register"
    />
  );
};
