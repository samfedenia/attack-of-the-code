import React from 'react';
import { UserProvider } from './user';
import { ViewProvider } from './view';
import { BackgroundProvider } from './background';
import { GameProvider } from './game';
import { SocketProvider } from './socket';
import { ChatProvider } from './chat';

// change names later?
export const CombinedContextProvider = ({ children }) => {
  return (
    <SocketProvider>
      <UserProvider>
        <ViewProvider>
          <BackgroundProvider>
            <ChatProvider>
              <GameProvider>
                {children}
              </GameProvider>
            </ChatProvider>
          </BackgroundProvider>
        </ViewProvider>
      </UserProvider>
    </SocketProvider>
  );
};
