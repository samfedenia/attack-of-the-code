const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const { InMemorySessionStore } = require('./sessionStore');

const createSocketServer = (server) => {
  const io = new Server(server);

  const sessionStore = new InMemorySessionStore();

  io.use(async (socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      const session = await sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.playerName = session.playerName;
        socket.roomCode = session.roomCode;
        return next();
      }
    }
    socket.sessionID = uuidv4();
    socket.userID = uuidv4();
    socket.playerName = '';
    socket.roomCode = '';
    next();
  });

  // socket.io logic

  // socketMemo = { usersSocket.id: [playerName, roomCode], ... }
  const socketMemo = {};
  const rooms = {}; // roomCode: [[playerName, usersSocket.id], ...]

  // handles the initial connection from client side
  io.on('connection', (socket) => {
    console.log('new socket connection');
    console.log(sessionStore.findSession(socket.sessionID));
    // persist session
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID || null,
      playerName: socket.playerName || null,
      roomCode: socket.roomCode || null,
    });

    // emit session details
    socket.emit('session', {
      sessionID: socket.sessionID,
      userID: socket.userID || null,
      playerName: socket.playerName || null,
      roomCode: socket.roomCode || null,
    });

    // join the "roomCode" room if exists
    if (socket.roomCode) socket.join(socket.roomCode);

    // ----------------------------------------------
    socket.on('join-room', (roomCode, playerName) => {
      // update session
      const oldSession = sessionStore.findSession(socket.sessionID);
      sessionStore.saveSession(socket.sessionID, {
        ...oldSession,
        playerName: playerName,
        roomCode: roomCode,
      });
      console.log(sessionStore.findSession(socket.sessionID));

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

    socket.on('chat-message', (roomCode, playerName, message, userID) => {
      console.log(
        `chat-message received in room: ${roomCode}
        from: ${playerName} with socketId: ${socket.id}
        message: ${message}
        `
      );
      io.in(roomCode).emit('chat-message', {
        playerName,
        message,
        userID,
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
