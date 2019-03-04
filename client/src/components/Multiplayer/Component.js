import React from "react";
import styled from "styled-components/macro";
import Editor from "../Editor/Container";
import Panel from "../Panel/Container";

class Multiplayer extends React.Component {
  componentWillMount() {
    const { token, history } = this.props;
    if (!token) history.push("/");
  }
  componentDidUpdate() {
    const { token, history } = this.props;
    if (!token) history.push("/");
  }

  render() {
    return (
      <Layout>
        <Prompt>{this.props.title}</Prompt>
        <Timer>{this.props.timer}</Timer>
        <Editor />
        <Panel />
      </Layout>
    );
  }
}

export default Multiplayer;

const Layout = styled.div`
  display: grid;
  grid-template-rows: 50px auto 10px;
  @media (max-width: 700px) {
    font-size: 18px;
    grid-template-rows: 50px 40% auto 0px;
  }
  grid-row-gap: 20px;
  grid-template-columns: 20px 1.5fr 20px 1fr 20px;
  height: calc(100vh - 68px);
  width: 100vw;
  overflow: none;
  box-sizing: border-box;
`;
const Prompt = styled.div`
  grid-row: 1;
  grid-column: 2;
  text-align: center;
  align-self: center;
  justify-self: center;
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.theme.normalText};
  background-color: ${props => props.theme.border};
  border-radius: 2px;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  padding: 0.5em;
  width: 70%;
  @media (max-width: 700px) {
    font-size: 18px;
  }
`;
const Timer = styled.h2`
  grid-row: 1;
  grid-column: 4;
  text-align: center;
  align-self: center;
  font-weight: bold;
  justify-self: center;
  color: ${props => props.theme.normalText};
  font-size: 28px;
  width: 100%;
  @media (max-width: 700px) {
    font-size: 18px;
  }
`;
