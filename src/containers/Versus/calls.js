import axios from 'axios';
import { compare } from 'Constants/api';
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

export function fetchComparison(type, p1, p2) {
    let params;
    if (type === 'player') {
        params = {
            p1,
            p2
        };
    } else {
        params = {
            t1: p1,
            t2: p2
        };
    }
    return dispatch => {
        dispatch(versusFetchingAction());
        axios
            .get(`${compare}/${type}`, {
                params
            })
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
