export const STATS_FETCH = 'STATS_FETCH';
export const STATS_FETCHING = 'STATS_FETCHING';
export const STATS_FETCHED = 'STATS_FETCHED';
export const STATS_ERROR_FETCH = 'STATS_ERROR_FETCH';

export const STATS_FILTER_FETCH = 'STATS_FILTER_FETCH';
export const STATS_FILTER_FETCHING = 'STATS_FILTER_FETCHING';
export const STATS_FILTER_FETCHED = 'STATS_FILTER_FETCHED';
export const STATS_FILTER_ERROR_FETCH = 'STATS_FILTER_ERROR_FETCH';

export const STATS_SET_SEASON = 'STATS_SET_SEASON';
export const STATS_SET_ACTIVE_FILTER = 'STATS_SET_ACTIVE_FILTER';

export const statstable = {
    batting: {
        1: [
            {
                label: 'Player',
                title: 'Player',
                key: 'PLAYER_NAME'
            },
            {
                label: 'Mat',
                title: 'Matches',
                key: 'MATCHES'
            },
            {
                label: 'Inns',
                title: 'Innings'
            },
            {
                label: 'NO',
                title: 'Not Out'
            },
            {
                label: 'Runs',
                title: 'Runs'
            },
            {
                label: 'HS',
                title: 'Highest Score'
            },
            {
                label: 'Avg',
                title: 'Average'
            },
            {
                label: 'BF',
                title: 'Ball Faced'
            },
            {
                label: 'SR',
                title: 'Strike Rate'
            },
            {
                label: '100',
                title: 'Centuries'
            },
            {
                label: '50',
                title: 'Fifties'
            },
            {
                label: '4s',
                title: 'Fours'
            },
            {
                label: '6s',
                title: 'Sixes'
            }
        ]
    }
};
