import React, { useReducer, createContext, useMemo } from 'react';

// exports: ChatContext, ACTIONS, ChatProvider

export const ChatContext = createContext();

export const ACTIONS = {
  USER_JOINED: 'USER_JOINED',
  USER_LEFT: 'USER_LEFT',
  CHAT_MESSAGE: 'CHAT_MESSAGE',
};

const chatHistoryRecovered = JSON.parse(
  window.sessionStorage.getItem('chat-history')
);

const handleSaveChatHistory = (state, action) => {
  window.sessionStorage.setItem(
    'chat-history',
    JSON.stringify([action.payload, ...state])
  );
};

const initialState = chatHistoryRecovered ? chatHistoryRecovered : [];

const reducer = (state, action) => {
  handleSaveChatHistory(state, action);
  switch (action.type) {
    case ACTIONS.USER_JOINED:
      return [action.payload, ...state];
    case ACTIONS.USER_LEFT:
      return [action.payload, ...state];
    case ACTIONS.CHAT_MESSAGE:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
