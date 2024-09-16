import React, { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        localStorage.removeItem("token");
        return { user: null };
      default:
        return state;
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = localStorage.getItem("token");
    if (user != null) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setLoading(false);
  }, []);

  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
