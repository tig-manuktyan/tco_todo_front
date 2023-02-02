import React, { useEffect } from "react";
import { setAuth, useTcoUIController } from "context";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { publicRoute, authRoute } from "routes";

const App = () => {
  const [controller, dispatch] = useTcoUIController();
  const { isAuth } = controller;

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setAuth(dispatch, true);
    } else {
      setAuth(dispatch, false);
    }
  }, [isAuth]);

  return (
    <Routes>
      {(isAuth &&
        authRoute.map((route, index) => (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={index}
          />
        ))) ||
        publicRoute.map((route, index) => (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={index}
          />
        ))}
      {(isAuth && <Route path="*" element={<Navigate to={"/"} />} />) || (
        <Route path="*" element={<Navigate to={"/login"} />} />
      )}
    </Routes>
  );
};

export default App;
