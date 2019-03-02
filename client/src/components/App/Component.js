import React from "react";
import { ThemeProvider } from "styled-components";
import { Router, Route, Switch } from "react-router-dom";
import theme from "../../theme";
import history from "../../util/history";
import GlobalStyle from "../../globalStyle";
import HeaderContainer from "../Header/Container";
import ErrorNotificationContainer from "../ErrorNotification/Container";
import LoginFormContainer from "../LoginForm/Container";
import SignupFormContainer from "../SignupForm/Container";
import Home from "../Home";
import MultiplayerContainer from "../Multiplayer/Container";
import DuelContainer from "../Duel/Container";
import RatingsContainer from "../Ratings/Container";
import LobbyContainer from "../Lobby/Container";
import ChatContainer from "../Chat/Container";
import {
  subscribeToOnlineSocket,
  subscribeToChatSocket
} from "../../socket/api";

export default class App extends React.Component {
  componentDidMount() {
    if (this.props.user) this.props.attemptJwtUpdate(this.props.user.username);
    subscribeToOnlineSocket(this.props.setOnline, this.props.user);
    subscribeToChatSocket(this.props.user);
  }

  render() {
    return (
      <ThemeProvider theme={theme(this.props.dark)}>
        <Router history={history}>
          <>
            <GlobalStyle />
            <Route component={HeaderContainer} />
            <Route component={ErrorNotificationContainer} />
            <Switch>
              <Route path="/login" component={LoginFormContainer} />
              <Route path="/signup" component={SignupFormContainer} />
              <Route path="/multiplayer" component={MultiplayerContainer} />
              <Route path="/duel" component={DuelContainer} />
              <Route path="/ratings" component={RatingsContainer} />
              <Route path="/lobby" component={LobbyContainer} />
              <Route path="/chat" component={ChatContainer} />
              <Route path="/" component={Home} />
            </Switch>
          </>
        </Router>
      </ThemeProvider>
    );
  }
}
