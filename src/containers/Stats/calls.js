import axios from 'axios';
import { stats, statsFilter } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    statsFetchAction,
    statsFetchingAction,
    statsFetchedAction,
    statsErrorFetchAction,
    statsFilterFetchAction,
    statsFilterFetchingAction,
    statsFilterFetchedAction,
    statsFilterErrorFetchAction,
    setActiveFilterAction,
    setSelectedSeasonAction
} from './actions';

export function statsReset() {
    return dispatch => {
        dispatch(statsFetchAction);
    };
}

export function statsFilterReset() {
    return dispatch => {
        dispatch(statsFilterFetchAction);
    };
}

export function setActiveFilter(type, filter) {
    return dispatch => {
        dispatch(setActiveFilterAction(type, filter));
    };
}

export function setSelectedSeason(data) {
    return dispatch => {
        dispatch(setSelectedSeasonAction(data));
    };
}

export function fetchStats(type, filter, season) {
    return dispatch => {
        dispatch(statsFetchingAction());
        axios
            .get(`${stats}/${type}/${season}`, { params: { q: filter } })
            .then(response => {
                if (!response.data.errorNum) {
                    dispatch(statsFetchedAction(response.data));
                } else {
                    dispatch(statsErrorFetchAction('Error in database!'));
                    toast(getMessage('error', 'Error in database!'), {
                        position: toast.POSITION.TOP_CENTER,
                        className: getClasses('error')
                    });
                }

                // toast(getMessage('error', 'Successfully logged in!'), {
                //     position: toast.POSITION.TOP_CENTER,
                //     className: getClasses('success')
                // });
            })
            .catch(error => {
                dispatch(statsErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching stats!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}

export function fetchStatsFilter() {
    return dispatch => {
        dispatch(statsFilterFetchingAction());
        axios
            .get(statsFilter)
            .then(response => {
                if (!response.data.errNum) {
                    dispatch(statsFilterFetchedAction(response.data));
                } else {
                    toast(getMessage('error', 'Error in database!'), {
                        position: toast.POSITION.TOP_CENTER,
                        className: getClasses('error')
                    });
                }

                // toast(getMessage('error', 'Successfully logged in!'), {
                //     position: toast.POSITION.TOP_CENTER,
                //     className: getClasses('success')
                // });
            })
            .catch(error => {
                dispatch(statsFilterErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching stats!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
