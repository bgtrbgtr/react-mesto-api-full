export default function Form({ name, onSubmit, title, buttonText, children }) {
  return (
    <>
      <h2 className="popup__heading popup__heading_type_sign-up">{title}</h2>
      <form
        action="#"
        className="popup__form popup__form_type_sign-up"
        name={name}
        method="post"
        onSubmit={onSubmit}
      >
        {children}
        <button
          type="submit"
          className="popup__submit popup__submit_type_sign-up"
          aria-label="Отправить данные"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
}
