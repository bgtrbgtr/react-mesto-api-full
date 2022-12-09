import blackPicPath from "../images/registration-complete.svg";
import redPicPath from "../images/registration-failure.svg";

export default function InfoTooltip({ isOpen, isOk, title, onClose }) {
  return (
    <div
      className={`popup popup_type_registration ${
        isOpen ? "popup_opened" : null
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть всплывающее окно"
          onClick={onClose}
        />
        {isOk ? (
          <>
            <img
              src={blackPicPath}
              alt="Регистрация успешна"
              className="popup__icon"
            />
            <h2 className="popup__heading popup__heading_type_sign-up-status">
              {title}
            </h2>
          </>
        ) : (
          <>
            <img
              src={redPicPath}
              alt="Что-то пошло не так"
              className="popup__icon"
            />
            <h2 className="popup__heading popup__heading_type_sign-up-status">
              {title}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
