import { connect } from "react-redux";
import TestResults from "./Component";

export const mapStateToProps = state => ({
  results: state.multiplayer.testResults,
  loading: state.multiplayer.loading
});

const TestResultsContainer = connect(
  mapStateToProps,
  null
)(TestResults);

export default TestResultsContainer;
