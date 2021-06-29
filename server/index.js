const PORT = process.env.PORT || 3000;
const app = require("./app");
const { createSocketServer } = require("./socketManager");

// start listening (and create a 'server' object representing our server)
const server = app.listen(PORT, () =>
  console.log(`Power! Unlimited power! (port ${PORT})`)
);
createSocketServer(server);
