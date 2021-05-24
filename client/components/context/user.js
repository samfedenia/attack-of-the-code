import { createContext } from "react";

export const UserContext = createContext();
export const user = {
  avatar: "",
  playerName: "",
  roomCode: "",
  socket: "",
  setUserContext: () => {},
};
