import React, { createContext } from 'react';
import { io } from 'socket.io-client';

// exports SocketContext, SocketProvider

const socket = io();

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
