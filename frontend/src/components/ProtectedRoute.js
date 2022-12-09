import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const context = useContext(AppContext);

  return (
    <Route>
      {() =>
        context.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
