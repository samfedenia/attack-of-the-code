import React, { useEffect, useContext } from "react";
import LandingPage from "./components/LandingPage";
import GameContainer from "./components/GameContainer";
import { UserContext } from "./components/context/user";
import Loading from "./components/Loading";
import { ViewContext, VIEW_ACTIONS } from "./components/context/view";
import { GameContext, GAME_ACTIONS } from "./components/context/game";
import { SocketContext } from "./components/context/socket";

import {
  PlayerlistContext,
  PLAYERLIST_ACTIONS,
} from "./components/context/playerlist";

const App = () => {
  const socket = useContext(SocketContext);
  const { playerlistDispatch } = useContext(PlayerlistContext);
  const { gameDispatch } = useContext(GameContext);

  const userFromSessionStorage = JSON.parse(
    window.sessionStorage.getItem("user")
  );
  const all = document.querySelectorAll("*");

  useEffect(() => {
    if (userFromSessionStorage?.roomCode) {
      socket.emit("room", userFromSessionStorage);
    }
    if (userFromSessionStorage?.font === "Aurebesh") {
      [...all].map((el) =>
        el.style.setProperty(
          "font-family",
          userFromSessionStorage.font,
          "important"
        )
      );
    }
  }, []);

  const { userState } = useContext(UserContext);
  const { viewState, viewDispatch } = useContext(ViewContext);

  useEffect(() => {
    setTimeout(
      () =>
        viewDispatch({
          type: VIEW_ACTIONS.CHANGE_VIEW,
          payload: { loading: false },
        }),
      2000
    );
  }, []);

  useEffect(() => {
    socket.on("user-list", (allPlayers) => {
      const allplayersSorted = allPlayers.sort((a, b) => b.score - a.score);

      playerlistDispatch({
        type: PLAYERLIST_ACTIONS.UPDATE_PLAYERLIST,
        payload: allplayersSorted,
      });
    });
  }, []);

  useEffect(() => {
    socket.on("existing-game-state", (gameState) => {
      gameDispatch({
        type: GAME_ACTIONS.SET_GAME,
        payload: gameState,
      });
    });
  }, []);

  return viewState.loading ? (
    <Loading />
  ) : (
    <>
      {userState?.roomCode || userFromSessionStorage?.roomCode ? (
        <GameContainer />
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default App;
