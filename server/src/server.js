// server/src/server.js
const express = require("express");
const compression = require("compression");
const http = require("http");
const path = require("path");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const databaseRoutes = require("./routes/database");
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./config");
const localStrategy = require("./auth/local");
const jwtStrategy = require("./auth/jwt");
require("dotenv").config();

/**
 * Setup services
 */

const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

const connect = url => {
  return mongoose.connect(url, config.db.options);
};

connect(config.db.prod);
mongoose.connection.on("error", console.log);

// Initiliase an express server
const app = express();

app.use(express.static(CLIENT_BUILD_PATH));
app.use(compression());

// Setup middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

passport.use(localStrategy);
passport.use(jwtStrategy);

require("./routes")(app);
let server = http.createServer(app);

const io = (module.exports.io = socket(server));
const ioOnline = (module.exports.ioOnline = io.of("api/online"));
const ioGame = (module.exports.ioGame = io.of("api/multiplayer"));
const ioDuel = (module.exports.ioDuel = io.of("api/duel"));
const ioChat = (module.exports.ioChat = io.of("api/chat"));

app.set("io", io);

const onlineSocketManager = require("./sockets/onlineSocketManager").ioOnline;
const gameSocketManager = require("./sockets/gameSocketManager").ioGame;
const duelSocketManager = require("./sockets/duelSocketManager").ioDuel;
const chatSocketManager = require("./sockets/chatSocketManager").ioChat;

ioOnline.on("connection", onlineSocketManager);
ioGame.on("connection", gameSocketManager);
ioDuel.on("connection", duelSocketManager);
ioChat.on("connection", chatSocketManager);

server.listen(config.port);
console.log(`Running on http://localhost:${config.port}😈`);

module.exports = app;
