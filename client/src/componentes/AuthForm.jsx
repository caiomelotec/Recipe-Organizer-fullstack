import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const AuthForm = ({
  title,
  emailPlaceholder,
  passwordPlaceholder,
  buttonText,
  linkText,
  linkTo,
  handleInputChange,
}) => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form">
          <div className="filter-div"></div>
          <h1 className="login-title">Koch</h1>
          <h3 className="login-subtitle">{title}</h3>
          {title === "Neues Konto erstellen" && (
            <div className="email-div">
              <CgProfile className="email-icon-login" />
              <input
                type="text"
                placeholder="Vorname"
                name="firstname"
                id="firstname"
                onChange={handleInputChange}
              />
            </div>
          )}
          {title === "Neues Konto erstellen" && (
            <div className="email-div">
              <CgProfile className="email-icon-login" />
              <input
                type="text"
                placeholder="Nachname"
                name="lastname"
                id="lastname"
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="email-div">
            <MdOutlineMailOutline className="email-icon-login" />
            <input
              type="email"
              placeholder={emailPlaceholder}
              name="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="password-div">
            <RiLockPasswordLine className="password-icon-login" />
            <input
              type="password"
              placeholder={passwordPlaceholder}
              name="password"
              id="password"
              onChange={handleInputChange}
            />
          </div>
          <button className="login-page-btn">{buttonText}</button>
          <span className="loginlink">{linkText}</span>
          <Link to={linkTo} className="login-link">
            {title === "Jetzt einloggen"
              ? "Neues Konto erstellen"
              : "Jetzt einloggen"}
          </Link>
        </form>
      </div>
    </div>
  );
};
