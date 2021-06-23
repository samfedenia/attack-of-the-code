import React from "react";
import { UserProvider } from "./user";
import { ViewProvider } from "./view";
import { BackgroundProvider } from "./background";
import { GameProvider } from "./game";
import { SocketProvider } from "./socket";
import { ChatProvider } from "./chat";
import { PlayerlistProvider } from "./playerlist";

// change names later?
export const CombinedContextProvider = ({ children }) => {
  return (
    <SocketProvider>
      <PlayerlistProvider>
        <UserProvider>
          <ViewProvider>
            <BackgroundProvider>
              <ChatProvider>
                <GameProvider>{children}</GameProvider>
              </ChatProvider>
            </BackgroundProvider>
          </ViewProvider>
        </UserProvider>
      </PlayerlistProvider>
    </SocketProvider>
  );
};
