import styled from "styled-components";
import React, { Component } from "react";
import DuelEditor from "../DuelEditor/Container";
import ScoreCard from "../ScoreCard/Component";
import {
  subscribeToDuelSocket,
  duelComplete,
  emitResponse,
  resetConsoleForOpponent,
  connectToRoom,
  clearPromptForOpponent
} from "../../socket/api";

export default class Duel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      console: [],
      opponentConsole: "",
      completionStatus: "",
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { token, history } = this.props;
    if (!token) history.push("/");
  }

  componentDidMount() {
    subscribeToDuelSocket();
  }

  componentDidUpdate() {
    const { token, history } = this.props;
    if (!token) history.push("/");
  }

  onSubmit() {
    this.props.resetConsoleResults();
    resetConsoleForOpponent();
    this.props
      .submit({
        solution: this.props.solution,
        tests: this.props.tests,
        testDescriptions: this.props.testDescriptions
      })
      .then(() => {
        emitResponse(this.props.testResults);
        this.props.setConsoleResults(this.props.testResults);
        let passing = this.props.message === "Success!";
        if (passing) {
          duelComplete();
          this.props.setDuelComplete();
          setTimeout(() => {
            this.props.resetConsoleResults();
            this.props.clearDuelPrompt();
            resetConsoleForOpponent();
            clearPromptForOpponent();
          }, 1500);
        }
      });
  }

  render() {
    let user = this.props.player;

    let button = this.props.loading ? (
      <Button>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </Button>
    ) : this.props.title ? (
      <Button onClick={() => this.onSubmit()}>Submit</Button>
    ) : this.props.waiting && !this.props.finished ? (
      <Button>Waiting for another user...</Button>
    ) : (
      <Button
        onClick={() => {
          this.props.resetDuelFinished();
          connectToRoom(user);
        }}
      >
        Join
      </Button>
    );

    let opponent = this.props.opponent;

    let results = this.props.console.map(result => {
      return <Result passing={result.passing}>{result.description}</Result>;
    });

    let opponentResults = this.props.opponentConsole.map(result => {
      return <Result passing={result.passing}>{result.description}</Result>;
    });

    return (
      <Layout>
        <UserDiv>
          <ScoreCard
            id={user._id}
            rank={user.rank}
            rating={user.rating}
            username={user.username}
            showRank={true}
          />
        </UserDiv>
        <UserDiv>
          <ScoreCard
            id={opponent._id}
            rank={opponent.rank}
            rating={opponent.rating}
            username={opponent.username}
            showRank={true}
          />
        </UserDiv>
        <DuelEditor />
        <Console>
          <UserConsole>
            {this.props.passing
              ? "You Won!"
              : this.props.opponentPassing
              ? "You Lost"
              : results}
          </UserConsole>
          <OpponentConsole>{opponentResults}</OpponentConsole>
        </Console>
        {button}
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 30px 10px 55vh auto 40px;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: calc(100vh - 68px);
  overflow: none;
`;
const UserDiv = styled.div`
  grid-row: 1;
  background-color: ${props => props.theme.border};
  border-radius: 2px;
  width: 75%;
  min-width: 200px;
  justify-self: center;
`;
const Console = styled.div`
  grid-row: 4;
  grid-column: 1 / 3;
  background: black;
  display: grid;
  overflow: auto;
  grid-template-columns: 1fr 1fr;
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.9);
`;
const UserConsole = styled.div`
  border-right: 1px solid dimgrey;
  color: green;
  overflow: auto;
  padding-left: 1rem;
`;
const Result = styled.p`
  font-size: 12px;
  margin: 0.5rem;
  color: ${props => {
    if (props.passing) {
      return "green";
    } else {
      return "red";
    }
  }};
  text-align: left;
`;
const OpponentConsole = styled.div`
  border-left: 1px solid dimgrey;
  color: red;
  overflow: auto;
  padding-left: 1rem;
`;
const Button = styled.button`
  grid-row: 5;
  grid-column: 1 / 3;
  width: 50%;
  height: 100%;
  justify-self: center;
  border-radius: 2px;
  font-size: 20px;
  background-color: ${props => props.theme.border};
  border: ${props => `1px solid ${props.theme.border}`};
  color: ${props => props.theme.normalText};
  &:hover {
    background-color: ${props => props.theme.normalText};
    color: ${props => props.theme.foreground};
    border: ${props => `1px solid ${props.theme.border}`};
    cursor: pointer;
  }
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;
