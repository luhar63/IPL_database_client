import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import SeasonSelect from 'Components/SeasonSelect';
import { Tabs, Tab } from 'react-bootstrap';
import { fetchMatches, updateSelectedSeason } from 'Containers/Matches/calls';
import './style.scss';
import ErrorContainer from '../../components/ErrorContainer';

class Versus extends Component {
    // state = {
    //     fakeLoader: false
    // };

    componentDidMount() {
        const { fetchmatches, matches } = this.props;
        if (matches.data == null) {
            fetchmatches();
        }
    }

    changeSelect = selectedSeason => {
        // this.setState({
        //     fakeLoader: true
        // });
        const { updateselectedseason } = this.props;

        setTimeout(() => {
            // this.setState({
            //     fakeLoader: false
            // });
            updateselectedseason(selectedSeason);
        }, 1000);
    };

    render() {
        const {
            matches: { isFetching, error, data, selectedSeason },
            match
        } = this.props;
        // const { fakeLoader } = this.state;
        let matches = [];
        let teamMeta = {};
        if (!isFetching && data && data.matches && selectedSeason) {
            matches = data.matches[selectedSeason.value];
            teamMeta = data.meta.teams;
        }

        return (
            <div id="matches">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Matches</title>
                </Helmet>
                <Header match={match} />
                <div className="matches-wrapper">
                    {/* <div className="dropdown-wrapper">
                        <SeasonSelect
                            value={selectedSeason}
                            className="season-dropdown"
                            onChange={this.changeSelect}
                        />
                        {!selectedSeason && (
                            <span className="drop-info">
                                Select a season to see match list
                            </span>
                        )}
                    </div> */}
                    <div className="match-list-wrapper">
                        {(isFetching) && <Loader />}
                        {error && <ErrorContainer errorMessage={error} />}
                        {data && matches && (
                            <Tabs
                                defaultActiveKey={`team#${detail.innings[0].batting[0].TEAM_BATTING_NAME}`}
                            >
                                <Tab>

                                </Tab>
                                <Tab>

                                </Tab>
                            </Tabs>
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
Versus.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchmatches: PropTypes.func.isRequired,
    matches: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    updateselectedseason: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ matches: state.matches });
const mapDispatchToProps = {
    fetchmatches: fetchMatches,
    updateselectedseason: updateSelectedSeason
};

export default connect(mapStateToProps, mapDispatchToProps)(Versus);
