import React from 'react';
import { UserContext } from './user';
import { ViewContext } from './view';
import { BackgroundContext } from './background';
import { GameContext } from './game';
import { SocketProvider } from './socket';
import { ChatProvider } from './chat';

// change names later?
export const CombinedContextProvider = ({
  userProfs,
  viewProfs,
  backgroundProfs,
  gameProfs,
  children,
}) => {
  return (
    <SocketProvider>
      <UserContext.Provider value={userProfs}>
        <ViewContext.Provider value={viewProfs}>
          <BackgroundContext.Provider value={backgroundProfs}>
            <ChatProvider>
              <GameContext.Provider value={gameProfs}>
                {children}
              </GameContext.Provider>
            </ChatProvider>
          </BackgroundContext.Provider>
        </ViewContext.Provider>
      </UserContext.Provider>
    </SocketProvider>
  );
};
