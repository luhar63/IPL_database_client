/* eslint-disable import/no-named-as-default */
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Home from 'Containers/Home/Loadable';
import Matches from 'Containers/Matches/Loadable';
import Match from 'Containers/Match';
import Page404 from 'Containers/Page404/Loadable';
import Teams from 'Containers/Teams/Loadable';
import Players from 'Containers/Players/Loadable';
import Player from 'Containers/Player';
import Team from 'Containers/Team/Loadable';
import Stats from 'Containers/Stats/Loadable';
import Versus from 'Containers/Versus/Loadable';
import ToastClose from 'Components/ToastClose';


import 'react-toastify/dist/ReactToastify.min.css';
import './style.scss';
import './normalize.scss';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class Root extends Component {
    state = {};

    render() {
        return (
            <div>
                <ToastContainer
                    autoClose={5000}
                    className="toast-container"
                    toastClassName="toast"
                    bodyClassName="toast-body"
                    closeButton={<ToastClose className="fa fa-times" />}
                />
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route exact path="/home" render={props => <Home {...props} />} />
                    <Route
                        exact
                        path="/matches"
                        render={props => <Matches {...props} />}
                    />
                    <Route
                        exact
                        path="/match/:matchid"
                        render={props => <Match {...props} />}
                    />
                    <Route
                        exact
                        path="/player/:playerid"
                        render={props => <Player {...props} />}
                    />
                    <Route
                        exact
                        path="/teams"
                        render={props => <Teams {...props} />}
                    />
                    <Route
                      exact
                      path="/team/:teamid"
                      render={props => <Team {...props} />}
                    />
                    <Route
                        exact
                        path="/players"
                        render={props => <Players {...props} />}
                    />
                    <Route
                        exact
                        path="/stats"
                        render={props => <Stats {...props} />}
                    />
                    <Route
                        exact
                        path="/versus"
                        render={props => <Versus {...props} />}
                    />
                    <Route
                        exact
                        path="*"
                        render={props => <Page404 {...props} />}
                    />
                </Switch>
            </div>
        );
    }
}

Root.propTypes = {
    // children: PropTypes.element
};

function mapStateToProps() {
    return {
        // user: state.userReducer.user
    };
}
function mapDispatchToProps() {
    return {
        // getUser: getUser()
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
