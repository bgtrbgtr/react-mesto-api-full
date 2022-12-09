import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Switch, Route, useHistory } from "react-router-dom";
import { Register } from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../auth.js";
import { AppContext } from "../contexts/AppContext.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [isRegistrationOk, setIsRegistrationOk] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        setLoggedIn(true);
        history.push("/");
        setUserEmail(res.data.email);
      });
    } else {
      setLoggedIn(false);
    }
  }

  const handleLogin = ({ password, email }) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          checkToken();
        }
      })
      .catch((e) => {
        setIsRegPopupOpen(true);
        setIsRegistrationOk(false);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(e);
      });
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRegPopupOpen(false);
  }

  function handleCardClick(e) {
    setSelectedCard(e);
    setTimeout(() => {
      setIsImagePopupOpen(true);
    }, 200);
  }

  function handleUpdateUser(newInfo) {
    setIsLoading(true);
    api
      .changeUserInfo(newInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .changeAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegFormSubmit({ password, email }) {
    auth
      .register(password, email)
      .then(() => {
        setTitle("Вы успешно зарегистрировались!");
        setIsRegPopupOpen(true);
        setIsRegistrationOk(true);
        history.push("/sign-in");
      })
      .catch((e) => {
        setIsRegPopupOpen(true);
        setIsRegistrationOk(false);
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(e);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isRegPopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <AppContext.Provider
      value={{
        handleLogin: handleLogin,
        loggedIn: loggedIn,
        handleRegistration: handleRegFormSubmit,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userEmail={userEmail} />
          <Switch>
            <Route exact path="/">
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  isLoading={isLoading}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  isLoading={isLoading}
                  onClose={closeAllPopups}
                  onAddCard={handleAddPlaceSubmit}
                />

                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                  isOpen={isImagePopupOpen}
                />

                <PopupWithForm
                  isOpen={false}
                  onClose={closeAllPopups}
                  name="confirm"
                  title="Вы уверены?"
                  buttonText="Да"
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  isLoading={isLoading}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </>
            </Route>
            <Route path="/sign-up">
              <Register handleRegFormSubmit={handleRegFormSubmit} />
              <InfoTooltip
                isOpen={isRegPopupOpen}
                isOk={isRegistrationOk}
                title={title}
                onClose={closeAllPopups}
              />
            </Route>
            <Route path="/sign-in">
              <Login />
              <InfoTooltip
                isOpen={isRegPopupOpen}
                isOk={isRegistrationOk}
                title={title}
                onClose={closeAllPopups}
              />
            </Route>
          </Switch>

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
