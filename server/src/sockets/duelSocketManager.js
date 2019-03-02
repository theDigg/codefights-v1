const ioDuel = require("../server").ioDuel;
const ToyProblem = require("../database/index").ToyProblem;
const patchUser = require("../database/index").patchUser;
const getUser = require("../database/index").getUser;
const updateWins = require("../database/index").updateWins;
const EloRank = require("../helpers/ranking");
const Promise = require("bluebird");

const elo = new EloRank();

let waitingRoom = {};
let duelRoom = {};
let roomId = `room${Math.random()}`;

let comparePlayers = roomArray => {
  let playerA, playerB;
  roomArray.forEach(player => {
    if (player.won) playerA = player;
    else playerB = player;
  });
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating);
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating);
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating);
  patchUser(playerA.username, ratingA);
  patchUser(playerB.username, ratingB);
  updateWins(playerA.username);
};

module.exports.ioDuel = socket => {
  let _user = null;
  let currentRoom = null;

  socket.emit("currentRoom", roomId);

  socket.on("joinDuelRoom", async ({ user }) => {
    currentRoom = roomId;
    socket.join(currentRoom);
    _user = await getUser(user.username);
    if (!waitingRoom[_user.username]) waitingRoom[_user.username] = _user;
    if (Object.keys(waitingRoom).length === 2) {
      duelRoom[currentRoom] = Object.keys(waitingRoom).map(i => waitingRoom[i]);
      startDuel(currentRoom);
      roomId = `room${Math.random()}`;
    }
  });

  socket.on("duelComplete", () => {
    let opponent;
    duelRoom[currentRoom].forEach(user => {
      if (user.username === _user.username) {
        user.won = true;
      } else {
        user.won = false;
      }
    });
    comparePlayers(duelRoom[currentRoom]);
    setTimeout(async () => {
      let user = await getUser(_user.username);
      duelRoom[currentRoom].forEach(async user => {
        if (user.won === false) {
          opponent = await getUser(user.username);
          updateClientOpponent(opponent);
        }
      });
      updateClientUser(user);
      delete duelRoom[currentRoom];
    }, 1000);
  });

  socket.on("duelTyping", letter => {
    socket.in(currentRoom).broadcast.emit("playerTyping", letter);
  });

  socket.on("userResponse", response => {
    socket.in(currentRoom).broadcast.emit("opponentResults", response);
  });

  socket.on("resetOpponentConsole", () => {
    socket.in(currentRoom).broadcast.emit("clearOpponentConsole");
  });

  socket.on("resetOpponentPrompt", () => {
    socket.in(currentRoom).broadcast.emit("clearOpponentPrompt");
  });
};

let updateClientUser = user => {
  ioDuel.emit("UPDATED_USER", user);
};

let updateClientOpponent = user => {
  ioDuel.emit("UPDATED_OPPONENT", user);
};

let startDuel = id => {
  ioDuel.in(id).emit("duelers", Object.values(waitingRoom));
  ToyProblem.countDocuments().exec((err, count) => {
    var random = Math.floor(Math.random() * count);
    ToyProblem.findOne()
      .skip(random)
      .exec((err, result) => {
        ioDuel.in(id).emit("challenge", result);
      });
  });
  waitingRoom = {};
};
