import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarUrlRef.current.value);
  }

  const avatarUrlRef = useRef();

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-image"
        className="popup__field popup__field_type_name"
        type="url"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        required
        ref={avatarUrlRef}
      />
      <span className="avatar-image-error popup__field-error"></span>
    </PopupWithForm>
  );
}
