import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete-button" : "element__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  return (
    <article className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
      <div
        className="element__image"
        style={{
          backgroundImage: `url(${card.link})`,
        }}
        onClick={handleCardClick}
      ></div>
      <div className="element__label">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Поставить лайк"
            onClick={handleCardLike}
          ></button>
          <p className="element__like-amount">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
