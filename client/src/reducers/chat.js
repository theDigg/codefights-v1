const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGE_RECIEVED":
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    default:
      return state;
  }
};
