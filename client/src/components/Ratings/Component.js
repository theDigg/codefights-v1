import styled from "styled-components";
import React, { Component } from "react";
import ScoreCard from "../../components/ScoreCard/Component";

export default class Ratings extends Component {
  componentDidMount() {
    this.props.getRatings();
  }

  render() {
    let usernames = this.props.leaderboard.map((user, i) => {
      return (
        <ScoreCard
          key={i}
          id={user._id}
          rank={user.rank}
          rating={user.rating}
          username={user.username}
          showRank={true}
        />
      );
    });

    return (
      <Layout>
        <Title>Leaderboard</Title>
        <Container>
          <MiddleDiv>{usernames}</MiddleDiv>
        </Container>
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 100px auto;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  min-height: 100vh;
  height: auto;
`;
const Container = styled.div`
  grid-row: 2;
  grid-column: 1 / 3;
  justify-self: center;
  width: 80%;
  margin-bottom: 5rem;
`;
const MiddleDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit);
`;
const Title = styled.h1`
  grid-row: 1;
  grid-column: 1 / 3;
  justify-self: center;
  align-self: center;
  color: ${props => props.theme.normalText};
  background-color: ${props => props.theme.border};
  box-shadow: 4px 4px 12px ${props => props.theme.shadow};
  width: 80%;
  text-align: center;
  font-size: 40px;
`;
