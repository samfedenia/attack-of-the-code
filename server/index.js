const PORT = process.env.PORT || 3000;
const app = require('./app');
const { Server } = require('socket.io');
let server;
const init = async () => {
  try {
    // start listening (and create a 'server' object representing our server)
    server = app.listen(PORT, () =>
      console.log(`Power! Unlimited power! (port ${PORT})`)
    );
  } catch (ex) {
    console.log(ex);
  }
};
init();
const io = new Server(server);

// socket.io logic

// denormalizedSocketMemo = { usersSocket.id: [playerName, roomCode], ... }
const denormalizedSocketMemo = {};
const rooms = {}; // roomCode: [[playerName, usersSocket.id], ...]

// handles the initial connection from client side
io.on('connection', (socket) => {
  socket.on('room', (roomCode, playerName) => {
    if (socket.id) denormalizedSocketMemo[socket.id] = [roomCode, playerName];

    if (rooms[roomCode])
      rooms[roomCode] = [...rooms[roomCode], [playerName, socket.id]];
    else rooms[roomCode] = [[playerName, socket.id]];

    socket.join(roomCode);
    socket.to(roomCode).emit('user-joined', { playerName });

    io.in(roomCode).emit(
      'user-list',
      rooms[roomCode].map((user) => user[0])
    );

    // workaround for setting userlist for new user join
    setTimeout(() => {
      io.to(socket.id).emit(
        'user-list',
        rooms[roomCode].map((user) => user[0])
      );
    }, 2000);
  });

  socket.on('chat-message', (roomCode, playerName, message) => {
    io.in(roomCode).emit('chat-message', { playerName, message });
  });

  socket.on('disconnect', () => {
    let roomCode, departedUser;
    if (denormalizedSocketMemo[socket.id]) {
      [roomCode, departedUser] = denormalizedSocketMemo[socket.id];
      delete denormalizedSocketMemo[socket.id];
    }
    if (roomCode) {
      io.in(roomCode).emit('user-left', { playerName: departedUser });
    }
    if (rooms[roomCode]) {
      rooms[roomCode] = rooms[roomCode].filter((user) => user[1] !== socket.id);
      io.in(roomCode).emit(
        'user-list',
        rooms[roomCode].map((user) => user[0])
      );
      if (rooms[roomCode].length === 0) delete rooms[roomCode];
    }
  });
});
