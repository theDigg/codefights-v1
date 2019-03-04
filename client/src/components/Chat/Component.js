import React, { Component } from "react";
import styled from "styled-components";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.enterInput = this.enterInput.bind(this);
  }

  componentWillMount() {
    const { token, history } = this.props;
    if (!token) history.push("/");
  }

  componentDidUpdate() {
    const { token, history } = this.props;
    if (!token) history.push("/");
  }

  enterInput(e) {
    if (e.key === "Enter") {
      this.props.handleSubmit({
        user: this.props.user,
        contents: this.props.message
      });
      this.props.clearAll();
    }
  }

  render() {
    let messages = [...this.props.messages].reverse().map((msg, i) => {
      if (msg.user.id === this.props.user.id) {
        return (
          <Message key={i} rank={msg.user.rank} float="left">
            <strong>{msg.user.username}</strong>
            {": " + msg.contents}
          </Message>
        );
      } else {
        return (
          <Message key={i} rank={msg.user.rank} float="right">
            <strong>{msg.user.username}</strong>
            {": " + msg.contents}
          </Message>
        );
      }
    });

    return (
      <Layout>
        <Body>
          <Window>
            <MessageBox>{messages}</MessageBox>
            <Input
              name="message"
              type="text"
              value={this.props.message}
              placeholder="Type here and hit Enter"
              onChange={e => this.props.addText("message", e.target.value)}
              onKeyPress={this.enterInput}
            />
          </Window>
        </Body>
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: block;
  width: 100vw;
  margin-top: -20px;
`;
const Body = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5% auto 5%;
  height: calc(100vh - 48px);
`;
const Window = styled.div`
  grid-row: 1;
  grid-column: 2;
  background: ${props => props.theme.foreground};
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 40px;
`;
const Message = styled.li`
  border: ${props => {
    if (props.rank === "Bad") {
      return "2px solid cyan";
    } else if (props.rank === "Noob") {
      return "2px solid green";
    } else if (props.rank === "Script Kiddie") {
      return "2px solid yellow";
    } else if (props.rank === "Brogrammer") {
      return "2px solid orange";
    } else if (props.rank === "Dev") {
      return "2px solid orangered";
    } else if (props.rank === "Senior") {
      return "2px solid red";
    } else if (props.rank === "Architect") {
      return "2px solid maroon";
    } else if (props.rank === "Genius") {
      return "2px solid #a500ff";
    } else if (props.rank === "Legend") {
      return "2px solid indigo";
    } else if (props.rank === "Hacker") {
      return "2px solid black";
    } else if (props.rank === "New") {
      return "2px solid white";
    }
  }};
  background: white;
  word-break: break-all;
  overflow: auto;
  float: ${props => {
    return props.float === "left" ? "left" : "right";
  }};
  margin: 5px;
  width: 80%;
  height: auto;
  min-height: 20px;
  border-radius: 8px;
  font-size: 20px;
  padding: 0.3rem;
  transform: rotate(-180deg);
`;
const MessageBox = styled.ul`
  grid-row: 1;
  transform: rotate(180deg);
  list-style: none;
  width: 100%;
  overflow: auto;
`;
const Input = styled.input`
  width: 100%;
  grid-row: 2;
  font-size: 20px;
  outline: 0px !important;
  -webkit-appearance: none;
`;
