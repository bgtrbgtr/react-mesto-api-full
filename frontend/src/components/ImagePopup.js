export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-wrap">
        <img
          src={`${card?.link}`}
          alt={`Изображение с карточки: ${card?.name}`}
          className="popup__image"
        />
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть изображение"
          onClick={onClose}
        />
        <p className="popup__image-caption">{card?.name}</p>
      </div>
    </div>
  );
}
