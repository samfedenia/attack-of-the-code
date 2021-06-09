import React from 'react';
import { UserProvider } from './user';
import { ViewContext } from './view';
import { BackgroundProvider } from './background';
import { GameContext } from './game';
import { SocketProvider } from './socket';
import { ChatProvider } from './chat';

// change names later?
export const CombinedContextProvider = ({ viewProfs, gameProfs, children }) => {
  return (
    <SocketProvider>
      <UserProvider>
        <ViewContext.Provider value={viewProfs}>
          <BackgroundProvider>
            <ChatProvider>
              <GameContext.Provider value={gameProfs}>
                {children}
              </GameContext.Provider>
            </ChatProvider>
          </BackgroundProvider>
        </ViewContext.Provider>
      </UserProvider>
    </SocketProvider>
  );
};
