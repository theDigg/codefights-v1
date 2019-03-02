import { chatSocket } from "../socket/api";

export const handleSubmit = message => {
  return {
    type: "SUBMIT_MESSAGE",
    socket: chatSocket.emit("message", message)
  };
};

export const addMessage = message => {
  return {
    type: "MESSAGE_RECIEVED",
    payload: message
  };
};
