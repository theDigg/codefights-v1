import ioclient from "socket.io-client";
import store from "../store";
import { getChallenge } from "../actions/prompt";
import { updateClientUser, updateClientOpponent } from "../actions/auth";
import {
  playersJoinedDuel,
  getDuelPrompt,
  playerTyping,
  opponentResults,
  clearOpponentConsole,
  setDuelRoom,
  clearOpponentPrompt
} from "../actions/duel";

import { addMessage } from "../actions/chat";

import { API_URL } from "../config/url";

export const socket = ioclient(`${API_URL}/online`);

export const subscribeToOnlineSocket = (callback, user) => {
  socket.on("connect", () => {
    socket.emit("USER_CONNECTED", user);
    socket.emit("GET_CONNECTED_USERS");
  });
  socket.on("CONNECTED_USERS", users => {
    callback(users);
  });
  socket.on("USER_CONNECTED", users => {
    callback(users);
  });
  socket.on("USER_DISCONNECTED", users => {
    callback(users);
  });
};

const gameSocket = ioclient(`${API_URL}/multiplayer`);

export const subscribeToGameSocket = (onScoreboardChange, onTimerChange) => {
  gameSocket.on("scoreboardChange", data => {
    onScoreboardChange(data);
  });

  gameSocket.on("challenge", challenge => {
    store.dispatch(getChallenge(challenge));
  });

  gameSocket.on("timer", count => {
    onTimerChange(count);
  });

  gameSocket.on("UPDATED_USER", user => {
    store.dispatch(updateClientUser(user));
  });
};

export const unsubscribe = () => {
  gameSocket.removeAllListeners("challenge");
  gameSocket.removeAllListeners("timer");
};

export const gameComplete = () => {
  gameSocket.emit("gameComplete");
};

export const joinWaitingRoom = userInfo =>
  gameSocket.emit("joinWaitingRoom", userInfo);

export const exitWaitingRoom = userInfo =>
  gameSocket.emit("exitWaitingRoom", userInfo);

export const joinDuelRoom = userInfo =>
  duelSocket.emit("joinDuelRoom", userInfo);

export const duelComplete = () => duelSocket.emit("duelComplete");

export const duelTyping = letter => {
  duelSocket.emit("duelTyping", letter);
};

export const emitResponse = response => {
  duelSocket.emit("userResponse", response);
};

export const resetConsoleForOpponent = () => {
  duelSocket.emit("resetOpponentConsole");
};

export const connectToRoom = (user, room) => {
  duelSocket.emit("joinDuelRoom", { user, room });
};

export const clearPromptForOpponent = () => {
  duelSocket.emit("resetOpponentPrompt");
};

const duelSocket = ioclient(`${API_URL}/duel`);

export const subscribeToDuelSocket = roomId => {
  duelSocket.on("connect", () => {
    duelSocket.emit("joinRoom", roomId);
  });

  duelSocket.on("currentRoom", roomId => {
    store.dispatch(setDuelRoom(roomId));
  });

  duelSocket.on("challenge", problem => {
    store.dispatch(getDuelPrompt(problem));
  });

  duelSocket.on("duelers", players => {
    store.dispatch(playersJoinedDuel(players));
  });

  duelSocket.on("playerTyping", letter => {
    store.dispatch(playerTyping(letter));
  });

  duelSocket.on("opponentResults", response => {
    store.dispatch(opponentResults(response));
  });

  duelSocket.on("clearOpponentConsole", () => {
    store.dispatch(clearOpponentConsole());
  });

  duelSocket.on("clearOpponentPrompt", () => {
    store.dispatch(clearOpponentPrompt());
  });

  duelSocket.on("UPDATED_USER", user => {
    store.dispatch(updateClientUser(user));
  });

  duelSocket.on("UPDATED_OPPONENT", user => {
    store.dispatch(updateClientOpponent(user));
  });
};

export const submitMessage = message => {
  chatSocket.emit("message", message);
};

export const chatSocket = ioclient(`${API_URL}/chat`);

export const subscribeToChatSocket = user => {
  chatSocket.emit("register", user);

  chatSocket.on("message", message => {
    store.dispatch(addMessage(message));
  });
};
