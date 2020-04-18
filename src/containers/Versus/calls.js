import axios from 'axios';
import { matches } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    versusFetchAction,
    versusFetchingAction,
    versusFetchedAction,
    versusErrorFetchAction,
    updateSelectedSeasonAction
} from './actions';

export function versusReset() {
    return dispatch => {
        dispatch(versusFetchAction);
    };
}
export function updateSelectedSeason(selectedSeason) {
    return dispatch => {
        dispatch(updateSelectedSeasonAction(selectedSeason));
    };
}

export function fetchMatches() {
    return dispatch => {
        dispatch(versusFetchingAction());
        axios
            .get(matches)
            .then(response => {
                if (!response.data.errorNum) {
                    dispatch(versusFetchedAction(response.data));
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
                dispatch(versusErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
