import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchTeams } from '../../actions/team';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

class TeamSelect extends Component {
    componentDidMount() {
        const { teamFetch, team } = this.props;
        if (team.data == null) {
            teamFetch();
        }
    }

    render() {
        const {
            className,
            team,
            showAll,
            onChange,
            showAllValue,
            value
        } = this.props;
        let options = [];
        if (team.data) {
            options = team.data.map(item => ({
                value: item.id,
                label: `${item.name}`
            }));
            if (showAll) {
                options.splice(0, 0, showAllValue);
            }
        }
        return (
            <Select
                name="team"
                value={value}
                defaultValue={showAllValue}
                placeholder="Select Team"
                onChange={onChange}
                className={className}
                isLoading={team.isFetching}
                options={options}
            />
        );
    }
}

TeamSelect.propTypes = {
    className: PropTypes.string,
    value: PropTypes.objectOf(Object),
    teamFetch: PropTypes.func.isRequired,
    team: PropTypes.objectOf(Object).isRequired,
    showAll: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    showAllValue: PropTypes.instanceOf(Object)
};

TeamSelect.getDefaultProps = {
    className: '',
    showAll: false,
    showAllValue: '',
    value: null
};

const mapStateToProps = state => ({ team: state.team });
const mapDispatchToProps = {
    teamFetch: fetchTeams
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelect);
