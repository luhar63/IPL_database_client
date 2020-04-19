import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchSelectPlayer } from '../../actions/player';

import './style.scss';
// import mainLogo from 'Assets/images/logo.png';

class PlayerSelect extends Component {
    componentDidMount() {
        const { playerFetch, player } = this.props;
        if (player.data == null) {
            playerFetch();
        }
    }

    shuffleArray = (array) => {
        let i;
        let j;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            // eslint-disable-next-line no-param-reassign
            array[i] = array[j];
            // eslint-disable-next-line no-param-reassign
            array[j] = temp;
        }
        return array;
    }

    render() {
        const {
            className,
            player,
            showAll,
            onChange,
            showAllValue,
            value
        } = this.props;
        let options = [];
        if (player.data) {
            options = player.data.map(item => ({
                value: item.PLAYER_ID,
                label: `${item.PLAYER_NAME}`
            }));
            if (showAll) {
                options.splice(0, 0, showAllValue);
            }
        }
        // options = this.shuffleArray(options);
        return (
            <Select
                name="team"
                value={value}
                defaultValue={showAllValue}
                placeholder="Select Player"
                onChange={onChange}
                className={className}
                isLoading={player.isFetching}
                options={options}
            />
        );
    }
}

PlayerSelect.propTypes = {
    className: PropTypes.string,
    value: PropTypes.objectOf(Object),
    playerFetch: PropTypes.func.isRequired,
    player: PropTypes.objectOf(Object).isRequired,
    showAll: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    showAllValue: PropTypes.instanceOf(Object)
};

PlayerSelect.getDefaultProps = {
    className: '',
    showAll: false,
    showAllValue: '',
    value: null
};

const mapStateToProps = state => ({ player: state.selectPlayer });
const mapDispatchToProps = {
    playerFetch: fetchSelectPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelect);
