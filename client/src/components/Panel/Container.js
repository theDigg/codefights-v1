import { connect } from "react-redux";
import { compose } from "redux";
import withAuth from "../../util/withAuth";
import Panel from "./Component";
import {
  submit,
  addSolution,
  changeRoom,
  onTimerChange,
  resetTimer,
  clearPrompt,
  setComplete
} from "../../actions/prompt";
import { onScoreboardChange, clearScoreboard } from "../../actions/score";

const mapStateToProps = state => ({
  solution: state.multiplayer.solution,
  tests: state.multiplayer.tests,
  testDescriptions: state.multiplayer.testDescriptions,
  message: state.multiplayer.message,
  timer: state.multiplayer.timer,
  scoreboard: state.score.scoreboard,
  isComplete: state.multiplayer.isComplete,
  room: state.multiplayer.room
});

const mapDispatchToProps = {
  submit,
  addSolution,
  changeRoom,
  onTimerChange,
  onScoreboardChange,
  resetTimer,
  clearPrompt,
  clearScoreboard,
  setComplete
};

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const PanelContainer = enhance(Panel);

export default PanelContainer;
