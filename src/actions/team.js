import axios from 'axios';
import { teams } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';

export const TEAM_FETCH = 'TEAM_FETCH';
export const TEAM_FETCHING = 'TEAM_FETCHING';
export const TEAM_FETCHED = 'TEAM_FETCHED';
export const TEAM_ERROR_FETCH = 'TEAM_ERROR_FETCH';

function teamFetchAction() {
    return {
        type: TEAM_FETCH
    };
}

function teamFetchingAction() {
    return {
        type: TEAM_FETCHING
    };
}

function teamFetchedAction(payload) {
    return {
        type: TEAM_FETCHED,
        payload
    };
}

function teamErrorFetchAction(error) {
    return {
        type: TEAM_ERROR_FETCH,
        error
    };
}

export function teamReset() {
    return dispatch => {
        dispatch(teamFetchAction);
    };
}

export function fetchTeams() {
    return dispatch => {
        dispatch(teamFetchingAction());
        axios
            .get(teams)
            .then(response => {
                if(Array.isArray(response.data)){
                    dispatch(teamFetchedAction(response.data));
                }
                else if(response.data.errNum) {
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

