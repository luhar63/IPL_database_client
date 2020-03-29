import axios from 'axios';
import { teams } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    teamsFetchAction,
    teamsFetchingAction,
    teamsFetchedAction,
    teamsErrorFetchAction
} from './actions';

export function teamsReset() {
    return dispatch => {
        dispatch(teamsFetchAction);
    };
}

export function fetchTeams() {
    return dispatch => {
        dispatch(teamsFetchingAction());
        axios
            .get(teams)
            .then(response => {
                dispatch(teamsFetchedAction(response));
                // toast(getMessage('error', 'Successfully logged in!'), {
                //     position: toast.POSITION.TOP_CENTER,
                //     className: getClasses('success')
                // });
            })
            .catch(error => {
                dispatch(teamsErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching teams!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
