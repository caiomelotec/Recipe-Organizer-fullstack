import { AuthForm } from "../componentes/AuthForm";

export const Register = () => {
  return (
    <AuthForm
      title="Neues Konto erstellen"
      emailPlaceholder="Email"
      passwordPlaceholder="Passwort"
      buttonText="Einloggen"
      linkText="Du hast bereits ein Koch-Konto?"
      linkTo="/login"
    />
  );
};
