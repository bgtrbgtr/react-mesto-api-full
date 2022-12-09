import logoPath from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

export default function Header(userEmail) {
  function handleLogOut() {
    localStorage.removeItem("jwt");
  }

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
            onClick={handleLogOut}
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
