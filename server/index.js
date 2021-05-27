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

// handles the initial connection from client side
io.on('connection', (socket) => {
  socket.on('room', (roomCode, playerName) => {
    if (socket.id) denormalizedSocketMemo[socket.id] = [roomCode, playerName];
    socket.join(roomCode);
    socket.to(roomCode).emit('user-joined', { playerName });
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
  });
});
