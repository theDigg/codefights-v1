const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user");

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true
//   })
//   .then(() => console.log("MongoDB Connected..."))
//   .catch(err => console.log(err));

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));

const ToyProblemSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  body: String,
  funcName: String,
  params: String,
  tests: Array,
  testDescriptions: Array
});

const UserChallengeSchema = new mongoose.Schema({
  owner: { type: String },
  title: { type: String },
  body: String,
  tests: String,
  testDescriptions: String,
  solution: String
});

const ScoreboardSchema = new mongoose.Schema({
  username: { type: String },
  rating: {
    type: Number,
    default: 0
  },
  entry: {
    type: Date,
    default: Date.now
  }
});

const ToyProblem = mongoose.model(
  "ToyProblem",
  ToyProblemSchema,
  "toyProblems"
);
const UserChallenge = mongoose.model(
  "UserChallenge",
  UserChallengeSchema,
  "userChallenges"
);
const Scoreboard = mongoose.model("Scoreboard", ScoreboardSchema, "scoreboard");

//Gets the top users based on score from User schema
let findLeaderboard = callback => {
  User.find((err, users) => {
    let names =
      users &&
      users.map(user => {
        return {
          _id: user._id,
          username: user.username,
          rating: user.rating,
          wins: user.wins,
          rank: user.rank
        };
      });
    if (err) {
      console.log(err);
    } else {
      callback(names);
    }
  }).sort({ rating: -1 });
};

//Gets all toy problems, unsorted
let findToyProblems = callback => {
  ToyProblem.find((err, toyProblems) => {
    if (err) {
      console.log(err);
    } else {
      callback(toyProblems);
    }
  });
};

let patchUser = (username, rating) => {
  if (rating < 800) {
    rankPlayer(username, rating, "Bad");
    return;
  } else if (rating < 900 && rating >= 800) {
    rankPlayer(username, rating, "Noob");
    return;
  } else if (rating < 1000 && rating >= 900) {
    rankPlayer(username, rating, "Script Kiddie");
    return;
  } else if (rating < 1100 && rating >= 1000) {
    rankPlayer(username, rating, "Brogrammer");
    return;
  } else if (rating < 1200 && rating >= 1100) {
    rankPlayer(username, rating, "Dev");
    return;
  } else if (rating < 1300 && rating >= 1200) {
    rankPlayer(username, rating, "Senior");
    return;
  } else if (rating < 1400 && rating >= 1300) {
    rankPlayer(username, rating, "Architect");
    return;
  } else if (rating < 1500 && rating >= 1400) {
    rankPlayer(username, rating, "Genius");
    return;
  } else if (rating < 1600 && rating >= 1500) {
    rankPlayer(username, rating, "Legend");
    return;
  } else if (rating >= 1600) {
    rankPlayer(username, rating, "Hacker");
    return;
  } else {
    User.updateOne(
      { username: username },
      { $set: { rating: rating } },
      (err, res) => {
        if (err) console.log(err);
      }
    );
  }
};

let updateWins = username => {
  User.updateOne(
    { username: username },
    { $inc: { wins: 0.5 } },
    (err, res) => {
      if (err) console.log(err);
    }
  ).catch(err => console.log(err));
};

let rankPlayer = (username, rating, rank) => {
  User.updateOne(
    { username: username },
    { $set: { rating: rating, rank: rank } },
    (err, res) => {
      if (err) console.log(err);
    }
  );
};

let getUser = username => {
  return new Promise(resolve => {
    User.findOne({ username: username }).then(user => {
      resolve(user.toJSON());
    });
  });
};

let getRank = username => {
  return new Promise(resolve => {
    User.findOne({ username: username }).then(user =>
      resolve(user.get("rank"))
    );
  });
};

// Database export
// Database export
//module.exports.db = db;

//User collection export
module.exports.Scoreboard = Scoreboard;
module.exports.UserChallenge = UserChallenge;
module.exports.ToyProblem = ToyProblem;

//User functions
module.exports.findLeaderboard = findLeaderboard;
module.exports.findToyProblems = findToyProblems;
module.exports.patchUser = patchUser;
module.exports.getUser = getUser;
module.exports.updateWins = updateWins;
module.exports.getRank = getRank;
