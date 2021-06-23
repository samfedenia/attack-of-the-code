import React, { createContext, useMemo, useReducer } from "react";

export const PlayerlistContext = createContext();

export const PLAYERLIST_ACTIONS = {
  UPDATE_PLAYERLIST: "UPDATE_PLAYERLIST",
};

const initialState = [];

const playerlistReducer = (state, action) => {
  const newPlayerlistState = action.payload;
  switch (action.type) {
    case PLAYERLIST_ACTIONS.UPDATE_PLAYERLIST:
      window.sessionStorage.setItem(
        "playerlist",
        JSON.stringify(newPlayerlistState)
      );
      return newPlayerlistState;
    default:
      return state;
  }
};

export const PlayerlistProvider = ({ children }) => {
  const [playerlistState, playerlistDispatch] = useReducer(
    playerlistReducer,
    initialState
  );

  const contextProvider = useMemo(() => {
    return {
      playerlistState,
      playerlistDispatch,
    };
  }, [playerlistState, playerlistDispatch]);
  return (
    <PlayerlistContext.Provider value={contextProvider}>
      {children}
    </PlayerlistContext.Provider>
  );
};
