const { Server } = require('socket.io');

const createSocketServer = (server) => {
  const io = new Server(server);

  // socket.io logic

  // socketMemo = { usersSocket.id: [playerName, roomCode], ... }
  const socketMemo = {};
  const rooms = {}; // roomCode: [[playerName, usersSocket.id], ...]

  // handles the initial connection from client side
  io.on('connection', (socket) => {
    console.log('new socket connection');
    socket.on('room', (roomCode, playerName) => {
      if (socket.id) socketMemo[socket.id] = [roomCode, playerName];

      if (rooms[roomCode])
        rooms[roomCode] = [...rooms[roomCode], [playerName, socket.id]];
      else rooms[roomCode] = [[playerName, socket.id]];
      console.log(`player: ${playerName} joined room: ${roomCode}`);
      socket.join(roomCode);
      socket.to(roomCode).emit('user-joined', { playerName });
      if (rooms[roomCode]) {
        setTimeout(() => {
          io.in(roomCode).emit(
            'user-list',
            rooms[roomCode]?.map((user) => user[0])
          );
        }, 3000);
      }
    });

    socket.on('chat-message', (roomCode, playerName, message) => {
      console.log(
        `chat-message received in room: ${roomCode}
        from: ${playerName} with socketId: ${socket.id}
        message: ${message}
        `
      );
      io.in(roomCode).emit('chat-message', {
        playerName,
        message,
        socketId: socket.id,
      });
    });

    socket.on('new-game-state', (gameState, roomCode) => {
      console.log('new game state in room: ', roomCode);
      io.in(roomCode).emit('game-state', gameState);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
      let roomCode, departedUser;
      if (socketMemo[socket.id]) {
        [roomCode, departedUser] = socketMemo[socket.id];
        delete socketMemo[socket.id];
      }
      if (roomCode) {
        io.in(roomCode).emit('user-left', { playerName: departedUser });
      }
      if (rooms[roomCode]) {
        rooms[roomCode] = rooms[roomCode].filter(
          (user) => user[1] !== socket.id
        );
        io.in(roomCode).emit(
          'user-list',
          rooms[roomCode].map((user) => user[0])
        );
        if (rooms[roomCode].length === 0) delete rooms[roomCode];
      }
    });
  });
  return io;
};

module.exports = createSocketServer;
