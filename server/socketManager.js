const { Server } = require("socket.io");

const createSocketServer = (server) => {
  const io = new Server(server);

  // socket.io logic

  // socketMemo = { usersSocket.id: { roomCode, playerName, avatar, background, score, submitted }, ... }
  const socketMemo = {};
  const rooms = {}; // roomCode: [{ roomCode, playerName, avatar, background, score, submitted }, ...]
  /**
   * const rooms = {
      roomCode: {
        players: [ {playerName...}, {...} ],
        gameState: {}
      },
      roomCode: {...},
    }
   */

  // handles the initial connection from client side
  io.on("connection", (socket) => {
    console.log("new socket connection");
    socket.on("room", (player) => {
      player.socketId = socket.id;
      const { roomCode, playerName, avatar, background, score, submitted } =
        player;
      if (socket.id) socketMemo[socket.id] = player;

      if (rooms[roomCode]) {
        rooms[roomCode].players = [
          ...rooms[roomCode].players,
          { ...player, socketId: socket.id },
        ];
        if (rooms[roomCode].hasOwnProperty("gameState")) {
          socket.emit("existing-game-state", rooms[roomCode].gameState);
        }
      }
      // rooms[roomCode] = [
      //   ...rooms[roomCode],
      //   { ...player, socketId: socket.id },
      // ];
      else {
        rooms[roomCode] = {
          players: [{ ...player, socketId: socket.id }],
          gameState: {},
        };
      }
      console.log(`player: ${playerName} joined room: ${roomCode}`);
      socket.join(roomCode);
      socket.to(roomCode).emit("user-joined", { playerName, avatar });
      if (rooms[roomCode]) {
        io.in(roomCode).emit("user-list", rooms[roomCode]?.players);
      }
    });

    socket.on("update-user", (player) => {
      const { roomCode, playerName, avatar, background, score, submitted } =
        player;

      if (socket.id) socketMemo[socket.id] = player;
      rooms[roomCode].players = [
        ...rooms[roomCode].players.filter(
          (user) => user.socketId !== socket.id
        ),
        { ...player, socketId: socket.id },
      ];

      io.in(roomCode).emit(
        "user-list",
        rooms[roomCode]?.players?.map((user) => user)
      );
    });

    socket.on("chat-message", (roomCode, playerName, message) => {
      console.log(
        `chat-message received in room: ${roomCode}
        from: ${playerName} with socketId: ${socket.id}
        message: ${message}
        `
      );
      io.in(roomCode).emit("chat-message", {
        playerName,
        message,
        socketId: socket.id,
      });
    });

    socket.on("new-game-state", (gameState, roomCode) => {
      console.log("new game state in room: ", roomCode);
      rooms[roomCode].gameState = gameState;
      io.in(roomCode).emit("game-state", gameState);
    });

    socket.on("answer-submission", (roomCode) => {
      io.in(roomCode).emit("answer-total-update");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
      let roomCode, playerName;

      if (socketMemo[socket.id]) {
        roomCode = socketMemo[socket.id].roomCode;
        playerName = socketMemo[socket.id].playerName;
      }

      if (socketMemo[socket.id]) {
        delete socketMemo[socket.id];
      }
      if (roomCode) {
        io.in(roomCode).emit("user-left", { playerName });
      }
      if (rooms[roomCode]) {
        rooms[roomCode].players = rooms[roomCode].players.filter(
          (user) => user.socketId !== socket.id
        );
        io.in(roomCode).emit(
          "user-list",
          rooms[roomCode].players.map((user) => user)
        );
        if (rooms[roomCode].players.length === 0) delete rooms[roomCode];
      }
    });
  });
  return io;
};

module.exports = {
  createSocketServer,
};
