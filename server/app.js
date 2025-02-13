const path = require("path");
const express = require("express");
const morgan = require("morgan");
const redirectSSL = require("redirect-ssl");
const cors = require("cors");
const app = express();
module.exports = app;

// SSL force redirect in production node env
app.use(
  redirectSSL.create({
    enabled: process.env.NODE_ENV === "production",
  })
);

app.use(cors());

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// api routes
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
// );

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
