import { connect } from "react-redux";
import Scoreboard from "./Component";

const mapStateToProps = state => ({
  scoreboard: state.score.scoreboard
});

const ScoreboardContainer = connect(
  mapStateToProps,
  null
)(Scoreboard);

export default ScoreboardContainer;
