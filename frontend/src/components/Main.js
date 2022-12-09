import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <button
            type="button"
            aria-label="Открыть окно изменения аватара"
            className="profile__change-avatar-button"
            onClick={onEditAvatar}
          />
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить карточку места"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards?.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
