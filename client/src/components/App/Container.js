import { connect } from "react-redux";
import { compose } from "redux";
import App from "./Component";
import { setOnline } from "../../actions/online";
import withAuth from "../../util/withAuth";
import { attemptJwtUpdate } from "../../actions/auth";

const mapStateToProps = state => ({ dark: state.theme.dark });

const mapDispatchToProps = { setOnline, attemptJwtUpdate };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const AppContainer = enhance(App);

export default AppContainer;
