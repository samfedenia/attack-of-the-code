import React, { useState, useEffect, useContext } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import { BackgroundContext } from "./context/background";
import { GameContext, GAME_ACTIONS } from "./context/game";
import { UserContext, USER_ACTIONS } from "./context/user";
import styles from "./css/Game.module.css";
import editorStyles from "./css/Editor.module.css";


const CodePenClone = ({ value, onChange }) => {
  const { backgroundsState } = useContext(BackgroundContext);
  const { userState, userDispatch } = useContext(UserContext);
  const { gameState, gameDispatch } = useContext(GameContext);
  const [theme, setTheme] = useState("material");

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const game = JSON.parse(window.sessionStorage.getItem("gameStatus"));
    if (user) {
      userDispatch({
        type: USER_ACTIONS.UPDATE_USER,
        payload: user,
      });
      document.body.style.background = `url(/backgrounds/${user.background}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
    }
    if (game) gameDispatch({ type: GAME_ACTIONS.SET_GAME, payload: game });
  }, []);

  const changeTheme = () => {
    if (theme === "material") {
      setTheme("default");
      document.body.style.background = `url(/jedi-prof.png), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
    } else {
      setTheme("material");
      // const randomNum = Math.floor(Math.random() * backgroundsState.length);
      document.body.style.background = `url(/backgrounds/${userState.background}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
    }
  };

  return (
    <>
      <div className="switch">
        <label
          style={{
            fontFamily: "StarJedi",
            textShadow: "black 0px 0px 2px",
            color: "white",
            letterSpacing: ".1em",
          }}
        >
          Dark Side
          <input onClick={changeTheme} type="checkbox" />
          <span className="lever"></span>
          Prof Side
        </label>
      </div>
      <div className={editorStyles.editorContainer}>
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className={editorStyles.codeMirrorWrapper}
          options={{
            lineWrapping: true,
            lint: true,
            mode: "javascript",
            theme: theme,
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
          }}
        />
      </div>
    </>
  );
};

export default CodePenClone;
