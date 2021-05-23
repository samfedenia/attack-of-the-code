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

const Chat = () => {
  // // socket connection logic
  // const socket = useContext(SocketContext);
  // const newRoomCode = Math.random().toString(36).slice(-5);
  // socket.emit("room", newRoomCode, "anon");

  return (
    <div className={styles.chat}>
      <h1>chat</h1>
    </div>
  );
};

export default Chat;
