import React, { createContext } from "react";
import { io } from "socket.io-client";

// exports SocketContext, SocketProvider

const http =
  window.document.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://www.attack-of-the-code.com";

const socket = io(http, { transports: ["websocket"] });

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
