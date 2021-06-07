import React from 'react';
import { UserContext } from './user';
import { ViewContext } from './view';
import { BackgroundProvider } from './background';
import { GameContext } from './game';
import { SocketProvider } from './socket';
import { ChatProvider } from './chat';

// change names later?
export const CombinedContextProvider = ({
  userProfs,
  viewProfs,
  gameProfs,
  children,
}) => {
  return (
    <SocketProvider>
      <UserContext.Provider value={userProfs}>
        <ViewContext.Provider value={viewProfs}>
          <BackgroundProvider>
            <ChatProvider>
              <GameContext.Provider value={gameProfs}>
                {children}
              </GameContext.Provider>
            </ChatProvider>
          </BackgroundProvider>
        </ViewContext.Provider>
      </UserContext.Provider>
    </SocketProvider>
  );
};
