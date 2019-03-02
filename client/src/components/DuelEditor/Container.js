import { connect } from "react-redux";
import { addDuelSolution } from "../../actions/duel";
import DuelEditor from "./Component";

export const mapStateToProps = state => ({
  input: state.duel.solution,
  opponent: state.duel.opponentSolution,
  dark: state.theme.dark
});

const mapDispatchToProps = { addDuelSolution };

const DuelEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DuelEditor);

export default DuelEditorContainer;
