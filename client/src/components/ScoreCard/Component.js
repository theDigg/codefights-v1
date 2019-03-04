import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.5em;
  box-shadow: 4px 4px 12px ${props => props.theme.shadow};
  border-radius: 2px;
  height: 30px;
  font-size: 16px;
  @media (max-width: 700px) {
    font-size: 14px;
  }
  color: ${props => {
    if (props.rank === "Hacker") {
      return "white";
    } else {
      return "black";
    }
  }};
  background: ${props => {
    if (props.rank === "Bad") {
      return "cyan";
    } else if (props.rank === "Noob") {
      return "green";
    } else if (props.rank === "Script Kiddie") {
      return "yellow";
    } else if (props.rank === "Brogrammer") {
      return "orange";
    } else if (props.rank === "Dev") {
      return "orangered";
    } else if (props.rank === "Senior") {
      return "red";
    } else if (props.rank === "Architect") {
      return "maroon";
    } else if (props.rank === "Genius") {
      return "#a500ff";
    } else if (props.rank === "Legend") {
      return "indigo";
    } else if (props.rank === "Hacker") {
      return "black";
    } else if (props.rank === "New") {
      return "white";
    }
  }};
`;
const Suffix = styled.span`
  grid-column: 1;
  font-weight: bold;
`;
const Username = styled.span`
  grid-column: 2;
  font-weight: bold;
`;
const Rating = styled.span`
  grid-column: 3;
  font-weight: bold;
  font-style: italic;
`;
const Rank = styled.span`
  grid-column: 4;
  font-weight: bold;
`;

const ScoreCard = ({ suffix, username, rank, showRank, rating }) => {
  let ranking = showRank ? <Rank>{rank}</Rank> : null;
  let place = suffix ? <Suffix>{suffix}</Suffix> : null;
  return (
    <Layout rank={rank}>
      {place}
      <Username>{username}</Username>
      <Rating>{rating}</Rating>
      {ranking}
    </Layout>
  );
};

export default ScoreCard;
