import { createContext, useContext, useReducer, useMemo } from "react";

import PropTypes from "prop-types";

const TcoUI = createContext();

TcoUI.displayName = "TcoUIContext";

// reducer
function reducer(state, action) {
  switch (action.type) {
    case "AUTH": {
      return { ...state, isAuth: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// context provider
function TcoUIControllerProvider({ children }) {
  const initialState = {
    isAuth: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <TcoUI.Provider value={value}>{children}</TcoUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useTcoUIController() {
  const context = useContext(TcoUI);

  if (!context) {
    throw new Error(
      "useTcoUIController should be used inside the TcoUIControllerProvider."
    );
  }

  return context;
}

TcoUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setAuth = (dispatch, value) => dispatch({ type: "AUTH", value });

export { TcoUIControllerProvider, useTcoUIController, setAuth };
