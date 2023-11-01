import { useState } from "react";
import { AuthForm } from "../componentes/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
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

  const notifySuccess = toast.success(success, {
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
      if (
        inputs.firstname.length &&
        inputs.lastname.length &&
        inputs.email.length &&
        inputs.password.length > 3
      ) {
        const res = await axios.post(
          "http://localhost:4000/api/register",
          inputs,
          {
            withCredentials: true,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setSuccess(res.data);
      } else {
        setError("Bitte füllen Sie die Felder vollständig aus.");
        notifyError();
      }
      notifySuccess();
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      notifyError();
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
      success={success}
    />
  );
};
