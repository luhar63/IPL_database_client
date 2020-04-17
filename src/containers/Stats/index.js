import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'Components/Header';
import Loader from 'Components/Loader';
import SeasonSelect from 'Components/SeasonSelect';
import { Table } from 'react-bootstrap';
import {
    fetchStatsFilter,
    setSelectedSeason,
    setActiveFilter,
    fetchStats
} from 'Containers/Stats/calls';

import PropTypes from 'prop-types';

import './style.scss';
import ErrorContainer from '../../components/ErrorContainer';

class Stats extends Component {
    state = {
        defaultSeasonValue: { value: 'all', label: 'All Seasons' },
        activeFilter: {
            filter: null,
            type: null
        }
    };

    static getDerivedStateFromProps(props, state) {
        const { fetchstats } = props;
        const { activeFilter, selectedSeason } = props.statsMisc;
        if (
            activeFilter &&
            selectedSeason &&
            ((state.activeFilter &&
                activeFilter.filter !== state.activeFilter.filter) ||
                (state.selectedSeason &&
                    selectedSeason.value !== state.selectedSeason.value))
        ) {
            fetchstats(
                activeFilter.type,
                activeFilter.filter,
                selectedSeason.value
            );
            return { activeFilter, selectedSeason };
        }
        // Return null to indicate no change to state.
        return null;
    }

    componentDidMount() {
        const {
            fetchstatsFilter,
            setselectedseason,
            setactivefilter
        } = this.props;
        const { defaultSeasonValue } = this.state;
        fetchstatsFilter();
        setselectedseason(defaultSeasonValue);
        setactivefilter('batting', 'mostruns');
    }

    filterSelect = (type, item) => {
        const { setactivefilter } = this.props;
        setactivefilter(type, item);
    };

    changeSelect = selectedSeason => {
        const { setselectedseason } = this.props;

        setselectedseason(selectedSeason);
    };

    renderFilters = (filters, type) => {
        const {
            statsMisc: { activeFilter }
        } = this.props;
        return (
            <ul>
                {Object.keys(filters[type]).map(item => {
                    const filter = filters[type][item];
                    return (
                        <li key={`id-${item}`}>
                            <button
                                type="button"
                                className={`link-button filter-anchor ${
                                    item === activeFilter.filter ? 'active' : ''
                                    }`}
                                onClick={e => {
                                    e.stopPropagation();
                                    this.filterSelect(type, item);
                                }}
                            >
                                {filter.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        );
    };

    renderBowlingTable = (header, renderData) => {
        const {
            statsMisc: { activeFilter },
            statsFilters: { data }
        } = this.props;
        const activeVal = data[activeFilter.type][activeFilter.filter].active;
        return (
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th title="Rank">Rank</th>
                        {header.map(item => {
                            switch (item) {
                                case 'BOWLER_NAME':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Player Name"
                                        >
                                            Player
                                        </th>
                                    );
                                case 'MATCHES':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Matches"
                                        >
                                            Mat
                                        </th>
                                    );
                                case 'INNINGS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Innings"
                                        >
                                            Inns
                                        </th>
                                    );
                                case 'RUNS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Runs"
                                        >
                                            Runs
                                        </th>
                                    );
                                case 'AVG':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Average"
                                        >
                                            Avg
                                        </th>
                                    );
                                case 'DOT_BALLS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Dots balls"
                                        >
                                            Dots
                                        </th>
                                    );
                                case 'SR':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Strike rate"
                                        >
                                            SR
                                        </th>
                                    );
                                case 'HATTRICKS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Hat Tricks"
                                        >
                                            HT
                                        </th>
                                    );
                                case 'OVERS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Overs"
                                        >
                                            Ov
                                        </th>
                                    );
                                case 'ECO':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Economy"
                                        >
                                            Eco
                                        </th>
                                    );
                                case 'MAIDEN':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Maiden overs"
                                        >
                                            Maid
                                        </th>
                                    );
                                case 'WICKETS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Wickets"
                                        >
                                            Wkts
                                        </th>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {renderData.map((item, i) => {
                        return (
                            <tr key={`rank-${item.BOWLER_ID}`}>
                                <th>{i + 1}</th>
                                {header.map(head => {
                                    switch (head) {
                                        case 'BOWLER_NAME':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.BOWLER_NAME}
                                                </td>
                                            );
                                        case 'MATCHES':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.MATCHES}
                                                </td>
                                            );
                                        case 'INNINGS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.INNINGS}
                                                </td>
                                            );
                                        case 'RUNS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.RUNS}
                                                </td>
                                            );
                                        case 'AVG':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.AVG == null ? "N/A" : item.AVG.toFixed(2)}
                                                </td>
                                            );
                                        case 'OVERS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.OVERS}
                                                </td>
                                            );
                                        case 'HATTRICKS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.HATTRICKS}
                                                </td>
                                            );
                                        case 'SR':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.SR == null ? "N/A" : item.SR.toFixed(2)}
                                                </td>
                                            );
                                        case 'WICKETS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.WICKETS == null ? 0 : item.WICKETS}
                                                </td>
                                            );
                                        case 'MAIDEN':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.MAIDEN}
                                                </td>
                                            );
                                        case 'DOT_BALLS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.DOT_BALLS}
                                                </td>
                                            );
                                        case 'ECO':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.ECO.toFixed(2)}
                                                </td>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

    renderBattingTable = (header, renderData) => {
        const {
            statsMisc: { activeFilter },
            statsFilters: { data }
        } = this.props;
        const activeVal = data[activeFilter.type][activeFilter.filter].active;
        return (
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th title="Rank">Rank</th>
                        {header.map(item => {
                            switch (item) {
                                case 'PLAYER_NAME':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Player Name"
                                        >
                                            Player
                                        </th>
                                    );
                                case 'MATCHES':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Matches"
                                        >
                                            Mat
                                        </th>
                                    );
                                case 'INNINGS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Innings"
                                        >
                                            Inns
                                        </th>
                                    );
                                case 'TEAM_AGAINST_NAME':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Against team"
                                        >
                                            Against team
                                        </th>
                                    );
                                case 'MATCH_DATE':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="match date"
                                        >
                                            Match Date
                                        </th>
                                    );
                                case 'BALLS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Balls"
                                        >
                                            Balls
                                        </th>
                                    );
                                case 'RUNS':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Runs"
                                        >
                                            Runs
                                        </th>
                                    );
                                case 'AVERAGE':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Average"
                                        >
                                            Avg
                                        </th>
                                    );
                                case 'BALLS_FACED':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Ball faced"
                                        >
                                            BF
                                        </th>
                                    );
                                case 'STRIKE_RATE':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Ball faced"
                                        >
                                            SR
                                        </th>
                                    );
                                case 'NOT_OUT':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Not Out"
                                        >
                                            NO
                                        </th>
                                    );
                                case 'HIGHEST_SCORE':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Highest Score"
                                        >
                                            HS
                                        </th>
                                    );
                                case 'FIFTY':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Fifties"
                                        >
                                            50s
                                        </th>
                                    );
                                case 'CENTURY':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Centuries"
                                        >
                                            100s
                                        </th>
                                    );
                                case 'SIX':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Sixes"
                                        >
                                            6s
                                        </th>
                                    );
                                case 'FOUR':
                                    return (
                                        <th
                                            key={item}
                                            className={
                                                activeVal === item
                                                    ? 'active'
                                                    : ''
                                            }
                                            title="Fours"
                                        >
                                            4s
                                        </th>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {renderData.map((item, i) => {
                        return (
                            <tr
                                key={`rank-${item.PLAYER_ID}${
                                    item.MATCH_ID ? `-${item.MATCH_ID}` : ''
                                    }`}
                            >
                                <th>{i + 1}</th>
                                {header.map(head => {
                                    switch (head) {
                                        case 'PLAYER_NAME':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    <Link
                                                        to={`/player/${item.PLAYER_ID}`}
                                                    >
                                                        {item.PLAYER_NAME}
                                                    </Link>
                                                </td>
                                            );
                                        case 'MATCHES':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.MATCHES}
                                                </td>
                                            );
                                        case 'INNINGS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.INNINGS}
                                                </td>
                                            );
                                        case 'TEAM_AGAINST_NAME':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    <Link
                                                        to={`/team/${item.TEAM_AGAINST}`}
                                                    >
                                                        {item.TEAM_AGAINST_NAME}
                                                    </Link>
                                                </td>
                                            );
                                        case 'MATCH_DATE':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {new Date(
                                                        item.MATCH_DATE
                                                    ).toDateString()}
                                                </td>
                                            );
                                        case 'BALLS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.BALLS}
                                                </td>
                                            );
                                        case 'RUNS':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.RUNS}
                                                </td>
                                            );
                                        case 'AVERAGE':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.AVERAGE.toFixed(2)}
                                                </td>
                                            );
                                        case 'BALLS_FACED':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.BALLS_FACED}
                                                </td>
                                            );
                                        case 'STRIKE_RATE':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.STRIKE_RATE.toFixed(
                                                        2
                                                    )}
                                                </td>
                                            );
                                        case 'NOT_OUT':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.NOT_OUT}
                                                </td>
                                            );
                                        case 'HIGHEST_SCORE':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.HIGHEST_SCORE}
                                                </td>
                                            );
                                        case 'FIFTY':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.FIFTY}
                                                </td>
                                            );
                                        case 'CENTURY':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.CENTURY}
                                                </td>
                                            );
                                        case 'SIX':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.SIX}
                                                </td>
                                            );
                                        case 'FOUR':
                                            return (
                                                <td
                                                    key={head}
                                                    className={
                                                        activeVal === head
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    {item.FOUR}
                                                </td>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

    render() {
        const { statsFilters, match, statsMisc, statsDetail } = this.props;
        const { selectedSeason } = statsMisc;
        const { defaultSeasonValue } = this.state;
        // let matches = [];
        // let teamMeta = {};
        // if (!isFetching && data && selectedSeason) {

        // }
        let firstRow;
        const { activeFilter } = statsMisc;
        const data =
            statsDetail && statsDetail.data && statsDetail.data
                ? statsDetail.data
                : null;
        if (data && Array.isArray(data)) {
            firstRow = Object.keys(data[0]);
        }
        return (
            <div id="stats">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Stats</title>
                </Helmet>
                <Header match={match} />
                <div className="stats-wrapper">
                    <div className="dropdown-wrapper">
                        <SeasonSelect
                            value={selectedSeason}
                            className="season-dropdown"
                            onChange={this.changeSelect}
                            showAll
                            showAllValue={defaultSeasonValue}
                        />
                    </div>
                    <div className="main-content">
                        <div className="stats-filter">
                            {statsFilters.isFetching && <Loader />}
                            {statsFilters.error && (
                                <ErrorContainer
                                    errorMessage={statsFilters.error}
                                />
                            )}
                            {!statsFilters.error && statsFilters.data && (
                                <div className="filters">
                                    <div className="batting">
                                        <h5>Batting</h5>
                                        {statsFilters.data &&
                                            this.renderFilters(
                                                statsFilters.data,
                                                'batting'
                                            )}
                                    </div>
                                    <div className="bowling">
                                        <h5>Bowling</h5>
                                        {statsFilters.data &&
                                            this.renderFilters(
                                                statsFilters.data,
                                                'bowling'
                                            )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="stats-main">
                            {statsDetail.isFetching && <Loader />}
                            {statsDetail.error && (
                                <ErrorContainer
                                    errorMessage={statsDetail.error}
                                />
                            )}
                            {!statsDetail.error &&
                                data &&
                                activeFilter.type === 'batting' &&
                                this.renderBattingTable(firstRow, data)}
                            {!statsDetail.error &&
                                data &&
                                activeFilter.type === 'bowling' &&
                                this.renderBowlingTable(firstRow, data)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Stats.propTypes = {
    // children: PropTypes.element
    // resetLogin: PropTypes.func.isRequired,
    fetchstatsFilter: PropTypes.func.isRequired,
    statsFilters: PropTypes.instanceOf(Object).isRequired,
    statsDetail: PropTypes.instanceOf(Object).isRequired,
    statsMisc: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    setselectedseason: PropTypes.func.isRequired,
    setactivefilter: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    statsFilters: state.stats.statsFilters,
    statsDetail: state.stats.statsDetail,
    statsMisc: state.stats.statsMisc
});
const mapDispatchToProps = {
    fetchstatsFilter: fetchStatsFilter,
    fetchstats: fetchStats,
    setselectedseason: setSelectedSeason,
    setactivefilter: setActiveFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
