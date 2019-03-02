import React, { Component } from "react";
import styled from "styled-components";
import "../../styles/loader.css";
import { gameComplete } from "../../socket/api";
import TestResults from "../TestResults/Container";
import Scoreboard from "../Scoreboard/Container";
import {
  subscribeToGameSocket,
  unsubscribe,
  joinWaitingRoom,
  exitWaitingRoom
} from "../../socket/api";

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["scores"],
      isComplete: false
    };

    this.clickTag = this.clickTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  joinGame() {
    joinWaitingRoom(this.props.user);
    subscribeToGameSocket(
      this.props.onScoreboardChange,
      this.props.onTimerChange
    );
  }

  leaveGame() {
    exitWaitingRoom(this.props.user);
    unsubscribe();
    this.props.resetTimer();
  }

  handleSubmit() {
    this.props.submit({
      solution: this.props.solution,
      tests: this.props.tests,
      testDescriptions: this.props.testDescriptions
    });

    setTimeout(() => {
      let passing = true;
      if (this.props.message !== "Success!") {
        passing = false;
      }
      if (passing) {
        gameComplete();
        this.props.setComplete();
        setTimeout(() => this.clickTag("scores"), 1000);
        this.leaveGame();
      }
    }, 1000);
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags });
  }

  render() {
    if (this.props.timer === 0) {
      this.props.scoreboard.forEach(user => {
        if (user.username === this.props.user.username) {
          if (user.finished === false) {
            this.leaveGame();
            this.clickTag("scores");
            this.props.clearPrompt();
            this.props.clearScoreboard();
            this.props.changeRoom("lobby");
          }
        }
      });
    }

    let panelBody =
      this.state.tags[0] === "results" ? (
        <Info>{<TestResults />}</Info>
      ) : (
        <Info>{<Scoreboard />}</Info>
      );

    let submitButton =
      this.props.isComplete === false ? (
        <Button
          onClick={() => {
            this.handleSubmit();
            this.clickTag("results");
            this.setState({
              results: ""
            });
          }}
        >
          Submit
        </Button>
      ) : (
        <Button
          onClick={() => {
            this.joinGame();
            this.props.changeRoom("waiting");
            this.clickTag("scores");
            this.props.clearPrompt();
            this.setState({ results: "" });
            this.props.clearScoreboard();
          }}
        >
          Play again
        </Button>
      );

    let joinButton =
      this.props.room === "lobby" ? (
        <Button
          onClick={() => {
            this.props.changeRoom("waiting");
            this.joinGame();
          }}
        >
          Join
        </Button>
      ) : this.props.room === "waiting" ? (
        <Button>Waiting...</Button>
      ) : (
        submitButton
      );

    return (
      <ResultsPanel>
        <TabContainer>
          <Tab
            active={this.state.tags[0] === "results"}
            onClick={() => {
              this.clickTag("results");
            }}
          >
            Results
          </Tab>
          <Tab
            active={this.state.tags[0] === "scores"}
            onClick={() => {
              this.clickTag("scores");
            }}
          >
            Players
          </Tab>
        </TabContainer>
        <Content>{panelBody}</Content>
        {joinButton}
      </ResultsPanel>
    );
  }
}

const ResultsPanel = styled.div`
  grid-column: 4;
  grid-row: 2;
  justify-self: center;
  display: grid;
  grid-template-rows: 40px auto 60px;
  width: 100%;
  overflow: auto;
  box-shadow: 4px 4px 12px ${props => props.theme.shadow};
  @media (max-width: 700px) {
    grid-column: 2 / 5;
    grid-row: 3;
    grid-template-rows: 40px auto 60px;
    margin-bottom: 20px;
  }
`;

const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  align-items: center;
`;
const Tab = styled.div`
  background-color: ${props => props.theme.border};
  color: ${props => props.theme.normalText};
  font-size: 28px;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
  padding: 2px;
  ${props => ({ active }) =>
    active &&
    `
    color: ${props.theme.normalText};
    background: ${props.theme.foreground};
    font-weight: bold;
  `};
  @media (max-width: 700px) {
    font-size: 18px;
  }
`;
const Content = styled.div`
  font-size: 10px;
  text-align: center;
  overflow: auto;
  font-weight: bold;
  padding: 1em;
  background-color: ${props => props.theme.foreground};
`;
const Info = styled.div`
  font-size: 24px;
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;
const Button = styled.button`
  grid-row: 3;
  font-size: 26px;
  color: ${props => props.theme.normalText};
  background-color: ${props => props.theme.border};
  border: ${props => `1px solid ${props.theme.border}`};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.normalText};
    color: ${props => props.theme.foreground};
    border: ${props => `1px solid ${props.theme.border}`};
  }
  height: 100%;
  @media (max-width: 700px) {
    font-size: 24px;
  }
`;
