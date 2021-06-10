import React from 'react';
import { UserProvider } from './user';
import { ViewProvider } from './view';
import { BackgroundProvider } from './background';
import { GameContext } from './game';
import { SocketProvider } from './socket';
import { ChatProvider } from './chat';

// change names later?
export const CombinedContextProvider = ({ gameProfs, children }) => {
  return (
    <SocketProvider>
      <UserProvider>
        <ViewProvider>
          <BackgroundProvider>
            <ChatProvider>
              <GameContext.Provider value={gameProfs}>
                {children}
              </GameContext.Provider>
            </ChatProvider>
          </BackgroundProvider>
        </ViewProvider>
      </UserProvider>
    </SocketProvider>
  );
};
