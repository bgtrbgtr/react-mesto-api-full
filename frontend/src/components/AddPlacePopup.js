import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddCard,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard(values);
  }

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-card"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <input
        id="place-name-field"
        className="popup__field popup__field_type_name"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="place-name-field-error popup__field-error"></span>
      <input
        id="place-image"
        className="popup__field popup__field_type_job"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="place-image-error popup__field-error"></span>
    </PopupWithForm>
  );
}
