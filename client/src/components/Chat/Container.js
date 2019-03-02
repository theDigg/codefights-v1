import { connect } from "react-redux";
import { compose } from "redux";
import Chat from "./Component";
import withAuth from "../../util/withAuth";
import { clearAll, addText } from "../../actions/inputText";
import { handleSubmit } from "../../actions/chat";

const mapStateToProps = state => ({
  message: state.input.message,
  messages: state.chat.messages
});

const mapDispatchToProps = { clearAll, addText, handleSubmit };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const ChatContainer = enhance(Chat);

export default ChatContainer;
