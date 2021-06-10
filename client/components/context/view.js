import React, { createContext, useMemo, useReducer } from 'react';

export const ViewContext = createContext();

export const VIEW_ACTIONS = {
  CHANGE_VIEW: 'CHANGE_VIEW',
};

const initialState = {
  loading: true,
  background: '',
  font: '',
};

const viewReducer = (state, action) => {
  switch (action.type) {
    case VIEW_ACTIONS.CHANGE_VIEW:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ViewProvider = ({ children }) => {
  const [viewState, viewDispatch] = useReducer(viewReducer, initialState);

  const contextProvider = useMemo(() => {
    return {
      viewState,
      viewDispatch,
    };
  }, [viewState, viewDispatch]);
  return (
    <ViewContext.Provider value={contextProvider}>
      {children}
    </ViewContext.Provider>
  );
};
