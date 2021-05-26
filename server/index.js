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
// socket memo keeps track of {roomCode: [[playername1, socketId], [playername2, socketId], ...]}
const socketMemo = {};

// implement a denormalized socketMemo with socket.id as the key
// denoSocketMemo = { usersSocket.id: [playerName, roomCode], ... }

// handles the initial connection from client side
io.on('connection', (socket) => {
  // console.log('a user connected');
  socket.on('room', (room, user) => {
    // console.log(`user: ${user}`, `joined room: ${room}`);
    const userTuple = [user, socket.id];
    if (socketMemo[room]) socketMemo[room] = [...socketMemo[room], userTuple];
    else socketMemo[room] = [userTuple];

    // console.log(socketMemo);
    socket.join(room);
    // clean up variable names to match client side and get rid of extra variables
    socket.to(room).emit('user-joined', { user, room });
  });

  socket.on('chat-message', (playerName, roomCode, message) => {
    // console.log('chat message', roomCode, message);
    io.in(roomCode).emit('chat-message', { playerName, message });
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected');
    // const disconnectedUserId = socket.id;
    // console.log('disconnected user', disconnectedUserId);
    for ([k, v] of Object.entries(socketMemo)) {
      // console.log('key', k);
      for (let i = 0; i < v.length; i++) {
        if (v[i][1] === socket.id) {
          // console.log('found disconnecting user: ', v[i][0]);
          io.in(k).emit('user-left', { user: v[i][0] });
          if (socketMemo[k]) {
            socketMemo[k] = [
              ...socketMemo[k].filter((usr) => usr[1] != v[i][1]),
            ];
          }
          if (socketMemo[k].length === 0) delete socketMemo[k];
          // console.log(socketMemo);
        }
      }
    }
  });
});
