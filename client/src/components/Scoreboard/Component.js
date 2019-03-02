import React from "react";
import ScoreCard from "../ScoreCard/Component";

const suffix = i => {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};

const Scoreboard = props => {
  return (
    <div>
      {props.scoreboard.map((user, i) => {
        if (user.finished === true) {
          return (
            <ScoreCard
              key={i}
              suffix={suffix(i + 1)}
              id={user._id}
              username={user.username}
              rating={user.rating}
              rank={user.rank}
              showRank={true}
            />
          );
        } else {
          return (
            <ScoreCard
              key={i}
              username={user.username}
              id={user._id}
              rank={user.rank}
              rating={user.rating}
              showRank={true}
            />
          );
        }
      })}
    </div>
  );
};

export default Scoreboard;
