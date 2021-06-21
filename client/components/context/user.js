import React, { createContext, useMemo, useReducer } from "react";

export const UserContext = createContext();

export const USER_ACTIONS = {
  UPDATE_USER: "UPDATE_USER",
};

const initialState = {
  avatar: "star_wars_heads_0000_Layer-3.png",
  background: "millenium.jpeg",
  playerName: "padawan",
  roomCode: "",
  score: 0,
  submitted: false,
};

const userReducer = (state, action) => {
  const newUserState = { ...state, ...action.payload };
  switch (action.type) {
    case USER_ACTIONS.UPDATE_USER:
      window.sessionStorage.setItem("user", JSON.stringify(newUserState));
      return newUserState;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  const contextProvider = useMemo(() => {
    return {
      userState,
      userDispatch,
    };
  }, [userState, userDispatch]);
  return (
    <UserContext.Provider value={contextProvider}>
      {children}
    </UserContext.Provider>
  );
};
