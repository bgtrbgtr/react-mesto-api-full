import Form from "./Form";
import { useForm } from "../hooks/useForm";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Login() {
  const { values, handleChange, setValues } = useForm({});
  const context = useContext(AppContext);
  const { email, password } = values;

  return (
    <Form
      name="sign-in"
      title="Войти"
      buttonText="Войти"
      onSubmit={(e) => {
        e.preventDefault();

        context.handleLogin({ password, email });
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
  );
}
