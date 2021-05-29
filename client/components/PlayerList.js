import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "materialize-css";
import {
  Container,
  Button,
  TextInput,
  Dropdown,
  Divider,
  Icon,
  Card,
  Row,
  Col,
  Select,
} from "react-materialize";
import Cycle from "./Cycle";
import styles from "./css/Game.module.css";
import { SocketContext } from "../components/context/socket";
import { use } from "../../server/api";

const PlayerList = () => {
  // // socket connection logic
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('user-list', (playerList) => console.log(playerList));
  }, [])

  return (
    <div className={styles.playerList}>
      <h1>playerList</h1>
    </div>
  );
};

export default PlayerList;
