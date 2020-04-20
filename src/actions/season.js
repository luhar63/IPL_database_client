import axios from 'axios';
import { seasons } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';

export const SEASON_FETCH = 'SEASON_FETCH';
export const SEASON_FETCHING = 'SEASON_FETCHING';
export const SEASON_FETCHED = 'SEASON_FETCHED';
export const SEASON_ERROR_FETCH = 'SEASON_ERROR_FETCH';

function seasonFetchAction() {
    return {
        type: SEASON_FETCH
    };
}

function seasonFetchingAction() {
    return {
        type: SEASON_FETCHING
    };
}

function seasonFetchedAction(payload) {
    return {
        type: SEASON_FETCHED,
        payload
    };
}

function seasonErrorFetchAction(error) {
    return {
        type: SEASON_ERROR_FETCH,
        error
    };
}

export function seasonReset() {
    return dispatch => {
        dispatch(seasonFetchAction);
    };
}

export function fetchSeasons() {
    return dispatch => {
        dispatch(seasonFetchingAction());
        axios
            .get(seasons)
            .then(response => {
                if (!response.data.errorNum) {
                    dispatch(seasonFetchedAction(response.data));
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
                dispatch(seasonErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching seasons!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}

