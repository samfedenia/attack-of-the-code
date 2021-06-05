const { Server } = require('socket.io');

const createSocketServer = (server) => {
  const io = new Server(server);

  // socket.io logic

  // socketMemo = { usersSocket.id: [playerName, roomCode], ... }
  const socketMemo = {};
  const rooms = {}; // roomCode: [[playerName, usersSocket.id], ...]

  // handles the initial connection from client side
  io.on('connection', (socket) => {
    socket.on('room', (roomCode, playerName) => {
      if (socket.id) socketMemo[socket.id] = [roomCode, playerName];

      if (rooms[roomCode])
        rooms[roomCode] = [...rooms[roomCode], [playerName, socket.id]];
      else rooms[roomCode] = [[playerName, socket.id]];

      socket.join(roomCode);
      socket.to(roomCode).emit('user-joined', { playerName });
      if (rooms[roomCode]) {
        io.in(roomCode).emit(
          'user-list',
          rooms[roomCode].map((user) => user[0])
        );

        // workaround for setting userlist for new user join
        setTimeout(() => {
          io.to(socket.id).emit(
            'user-list',
            rooms[roomCode]?.map((user) => user[0])
          );
        }, 2000);
      }
    });

    socket.on('chat-message', (roomCode, playerName, message) => {
      io.in(roomCode).emit('chat-message', { playerName, message });
    });

    socket.on('new-game-state', (gameState, roomCode) => {
      io.in(roomCode).emit('game-state', gameState);
    });

    socket.on('disconnect', () => {
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
