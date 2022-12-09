import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="name-field"
        className="popup__field popup__field_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="name-field-error popup__field-error"></span>
      <input
        id="job-field"
        className="popup__field popup__field_type_job"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="job-field-error popup__field-error"></span>
    </PopupWithForm>
  );
}
