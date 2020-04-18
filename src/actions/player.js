import axios from 'axios';
import { teams } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';

export const PLAYER_SELECT_FETCH = 'PLAYER_SELECT_FETCH';
export const PLAYER_SELECT_FETCHING = 'PLAYER_SELECT_FETCHING';
export const PLAYER_SELECT_FETCHED = 'PLAYER_SELECT_FETCHED';
export const PLAYER_SELECT_ERROR_FETCH = 'PLAYER_SELECT_ERROR_FETCH';

function playerFetchAction() {
    return {
        type: PLAYER_SELECT_FETCH
    };
}

function playerFetchingAction() {
    return {
        type: PLAYER_SELECT_FETCHING
    };
}

function playerFetchedAction(payload) {
    return {
        type: PLAYER_SELECT_FETCHED,
        payload
    };
}

function teamErrorFetchAction(error) {
    return {
        type: PLAYER_SELECT_ERROR_FETCH,
        error
    };
}

export function playerReset() {
    return dispatch => {
        dispatch(playerFetchAction);
    };
}

export function fetchTeams() {
    return dispatch => {
        dispatch(playerFetchingAction());
        axios
            .get(teams)
            .then(response => {
                if (Array.isArray(response.data)) {
                    dispatch(playerFetchedAction(response.data));
                }
                else if (response.data.errNum) {
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
                dispatch(teamErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching teams!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}

