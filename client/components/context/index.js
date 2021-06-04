import React from 'react';
import { UserContext } from './user';
import { ViewContext } from './view';
import { BackgroundContext } from './background';
import { GameContext } from './game';
import { SocketContext, socket } from './socket';

// change names later?
export const CombinedContextProvider = ({
  userProfs,
  viewProfs,
  backgroundProfs,
  gameProfs,
  children,
}) => {
  return (
    <SocketContext.Provider value={socket}>
      <UserContext.Provider value={userProfs}>
        <ViewContext.Provider value={viewProfs}>
          <BackgroundContext.Provider value={backgroundProfs}>
            <GameContext.Provider value={gameProfs}>
              {children}
            </GameContext.Provider>
          </BackgroundContext.Provider>
        </ViewContext.Provider>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
};
