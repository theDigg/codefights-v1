import React, { Component } from "react";
import styled from "styled-components";
import ScoreCard from "../../components/ScoreCard/Component";

export default class Lobby extends Component {
  render() {
    let mapping =
      this.props.users &&
      Object.keys(this.props.users).map(key => {
        return [key, this.props.users[key]];
      });

    let userList =
      mapping &&
      mapping.map((arr, i) => (
        <ScoreCard
          key={i}
          rank={arr[1].rank}
          showRank={true}
          id={arr[1]._id}
          rating={arr[1].rating}
          username={arr[1].username}
          style={{
            margin: "1em"
          }}
        />
      ));

    return (
      <Layout>
        <Body>
          <Legend>
            <Ranks>Ranks / Ratings</Ranks>
            <EntryDiv>
              <p>Hacker</p>
              <p>Legend</p>
              <p>Genius</p>
              <p>Architect</p>
              <p>Senior</p>
              <p>Dev</p>
              <p>Brogrammer</p>
              <p>Script Kiddie</p>
              <p>Noob</p>
              <p>Bad</p>
              <p>New</p>
            </EntryDiv>
            <RatingDiv>
              <p>1600 + </p>
              <p>1500 - 1600</p>
              <p>1400 - 1500</p>
              <p>1300 - 1400</p>
              <p>1200 - 1300</p>
              <p>1100 - 1200</p>
              <p>1000 - 1100</p>
              <p>900 - 1000</p>
              <p>800 - 900</p>
              <p> 0 - 800 </p>
              <p>1000</p>
            </RatingDiv>
            <ColorDiv>
              <div
                style={{
                  background: "black",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "indigo",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "#a500ff",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "maroon",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "red",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "orangered",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "orange",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "yellow",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "green",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "cyan",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "white",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
            </ColorDiv>
          </Legend>
          <OnlineUsers>
            <Online>Online Users</Online>
            <UserList>{userList}</UserList>
          </OnlineUsers>
        </Body>
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, 1fr);
  width: 100vw;
  margin-top: -20px;
  height: calc(100vh - 48px);
`;
const Body = styled.div`
  grid-row: 1;
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1.25fr;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;
const Legend = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  background: ${props => props.theme.border};
  padding: 1rem;
  min-width: 150px;
  @media (max-width: 600px) {
    grid-row: 2;
    width: 100%;
  }
`;
const Ranks = styled.h1`
  grid-row: 1;
  grid-column: 1 / 4;
  color: gainsboro;
  font-size: 30px;
  justify-self: center;
  align-self: center;
  text-align: center;
  background: grey;
  margin-bottom: 1em;
  width: 100%;
`;
const EntryDiv = styled.div`
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  color: ${props => props.theme.normalText};
  font-weight: bold;
  font-size: 16px;
`;
const RatingDiv = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  color: ${props => props.theme.normalText};
  font-weight: bold;
  font-size: 16px;
`;
const ColorDiv = styled.div`
  grid-column: 3;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
`;
const OnlineUsers = styled.div`
  grid-column: 2;
  display: grid;
  grid-template-rows: 70px auto;
  @media (max-width: 700px) {
    grid-row: 1;
    grid-column: 1;
  }
`;
const Online = styled.h1`
  grid-row: 1;
  justify-self: center;
  align-self: center;
  font-size: 30px;
  color: ${props => props.theme.normalText};
  width: 100%;
  text-align: center;
  font-size: 30px;
`;
const UserList = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 30px);
  grid-row-gap: 10px;
  overflow: auto;
  justify-self: center;
  width: 80%;
  padding: 1em;
`;
