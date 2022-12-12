import logoPath from "../images/logo.svg";
import { AppContext } from "../contexts/AppContext";
import { Route, Switch, Link } from "react-router-dom";
import { useContext } from "react";

export default function Header(userEmail) {
  function handleLogout() {
    localStorage.removeItem("jwt");
  }
  
  const context = useContext(AppContext);
  
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип Mesto" className="header__logo" />
      <Switch>
        <Route exact path={"/"}>
          {userEmail ? (
            <p className="header__user-info">{userEmail.userEmail}</p>
          ) : null}
          <Link
            to={"/sign-in"}
            className="header__button"
            onClick={handleLogout}
            style={{ color: "#A9A9A9" }}
          >
            Выйти
          </Link>
        </Route>
        <Route path={"/sign-in"}>
          <Link to={"/sign-up"} className="header__button">
            Регистрация
          </Link>
        </Route>
        <Route path={"/sign-up"}>
          <Link to={"/sign-in"} className="header__button">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
