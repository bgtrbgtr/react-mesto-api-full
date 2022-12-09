export default function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : null}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть всплывающее окно"
          onClick={onClose}
        />
        <h2 className="popup__heading">{title}</h2>
        <form
          action="#"
          className={`popup__form popup__form_type_${name}`}
          name={name}
          method="post"
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="popup__submit popup__submit_type_save"
            aria-label="Сохранить информацию"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
