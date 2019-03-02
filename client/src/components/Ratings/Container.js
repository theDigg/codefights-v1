import { connect } from "react-redux";
import Ratings from "./Component";
import { getRatings } from "../../actions/score";

const mapStateToProps = state => ({
  leaderboard: state.score.leaderboard
});

const mapDispatchToProps = { getRatings };

const RatingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Ratings);
export default RatingsContainer;
