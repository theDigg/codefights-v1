import { connect } from "react-redux";
import { compose } from "redux";
import withAuth from "../../util/withAuth";
import Multiplayer from "./Component";

const mapStateToProps = state => ({
  title: state.multiplayer.title,
  solution: state.multiplayer.solution,
  timer: state.multiplayer.timer
});

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    null
  )
);

const MultiplayerContainer = enhance(Multiplayer);
export default MultiplayerContainer;
