const ioGame = require("../server").ioGame;
const Challenge = require("../models/challenge");
const patchUser = require("../database/index").patchUser;
const getUser = require("../database/index").getUser;
const updateWins = require("../database/index").updateWins;
const EloRank = require("../helpers/ranking");
const Promise = require("bluebird");

const elo = new EloRank();

let waitingRoom = {};
let waitingUsers = [];
let gameRoom = [];
let scoreboard = [];

const startGame = async () => {
  rankFinishers();
  setTimeout(async () => {
    await Promise.map(waitingUsers, user => {
      return getUser(user.username).then(user => {
        user.finished = false;
        return user;
      });
    }).then(users => {
      gameRoom = users;
    });
    scoreboard = [];
    waitingUsers = [];
    waitingRoom = {};
    Challenge.countDocuments().exec(function(err, count) {
      var random = Math.floor(Math.random() * count);
      Challenge.findOne()
        .skip(random)
        .exec(function(err, challenge) {
          ioGame.emit("challenge", challenge);
        });
    });
    // ToyProblem.findOne({ title: "Fibonacci" }).exec((err, res) => {
    //   if (err) console.log(err);
    //   ioGame.emit("challenge", res);
    // });
    scoreboardChange();
  }, 800);
};

const updateUserInGameRoom = username => {
  gameRoom.forEach(user => {
    if (user.username.toString() === username.toString()) {
      user.finished = true;
    }
  });
};

module.exports.ioGame = socket => {
  let _user = null;
  socket.on("joinWaitingRoom", async user => {
    _user = await getUser(user.username);
    if (!waitingRoom[_user.username]) waitingUsers.push(_user);
    waitingRoom[_user.username] = _user;
  });

  socket.on("gameComplete", () => {
    if (_user !== null) _user.finished = true;
    updateUserInGameRoom(_user.username);
    scoreboardChange(_user);
  });
};

const scoreboardChange = user => {
  if (user && user.finished) {
    scoreboard.push(user);
  }
  const unfinishedUsers = getUnfinished(gameRoom);
  const clientScoreboard = [...scoreboard, ...unfinishedUsers];
  ioGame.emit("scoreboardChange", clientScoreboard);
};

const getUnfinished = users => {
  let unfinished = [];
  users.forEach(user => {
    if (user.finished === false) {
      unfinished.push(user);
    }
  });
  return unfinished;
};

let upgrade = player => {
  let expectedScoreA = elo.getExpected(player.rating, 2000);
  let expectedScoreB = elo.getExpected(2000, player.rating);
  ratingA = elo.updateRating(expectedScoreA, 1, player.rating);
  ratingB = elo.updateRating(expectedScoreB, 0, 2000);
  patchUser(player.username, ratingA);
};

const rankFinishers = () => {
  let unfinishedUsers = getUnfinished(gameRoom);

  if (scoreboard.length + unfinishedUsers.length >= 2) {
    if (scoreboard[0]) {
      let user = scoreboard[0];
      updateWins(user.username);
      upgrade(user);
      setTimeout(async () => {
        let updatedUser = await getUser(user.username);
        ioGame.emit("UPDATED_USER", updatedUser);
      }, 1000);
    }
  }
};

let timer = 20;

setInterval(() => {
  if (timer === -1) {
    timer = 20;
    startGame();
  }
  ioGame.emit("timer", timer);
  timer--;
}, 1000);
