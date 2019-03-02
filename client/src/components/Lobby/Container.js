import { connect } from "react-redux";
import Lobby from "./Component";

const mapStateToProps = state => ({
  users: state.online.users
});

const LobbyContainer = connect(mapStateToProps)(Lobby);

export default LobbyContainer;
