import React, { createContext, useMemo, useReducer } from 'react';

export const UserContext = createContext();

export const USER_ACTIONS = {
  UPDATE_USER: 'UPDATE_USER',
};

const initialState = {
  avatar: '',
  background: '',
  playerName: '',
  roomCode: '',
  score: 0,
  submitted: false,
  userID: '',
};

const userReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case USER_ACTIONS.UPDATE_USER:
      return { ...state, ...action.payload };
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
