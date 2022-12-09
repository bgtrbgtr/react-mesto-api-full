import Form from "./Form";
import { useForm } from "../hooks/useForm";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export const Register = () => {
  const { values, handleChange, setValues } = useForm({});
  const context = useContext(AppContext);
  const { email, password } = values;

  return (
    <>
      <Form
        name="sign-up"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={(e) => {
          e.preventDefault();

          context.handleRegistration({ password, email });
          setValues({});
        }}
      >
        <input
          id="email-field"
          className="popup__field popup__field_type_email"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="name-field-error popup__field-error"></span>
        <input
          id="password-field"
          className="popup__field popup__field_type_password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="30"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="job-field-error popup__field-error"></span>
      </Form>
      <button className="popup__submit" style={{ margin: 0, padding: 0 }}>
        <Link
          to={"/sign-in"}
          style={{
            fontSize: "14px",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          Уже зарегистрированы? Войти
        </Link>
      </button>
    </>
  );
};
