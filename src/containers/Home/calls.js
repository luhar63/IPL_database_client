import axios from 'axios';
import { search, tuples } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    searchFetchAction,
    searchFetchingAction,
    searchFetchedAction,
    searchErrorFetchAction,
    tuplesFetchingAction,
    tuplesFetchedAction,
    tuplesErrorFetchAction
} from './actions';

export function searchReset() {
    return dispatch => {
        dispatch(searchFetchAction);
    };
}

export function searchFetch(q) {
    return dispatch => {
        dispatch(searchFetchingAction());
        axios
            .get(search, {
                params: {
                    q
                }
            })
            .then(response => {
                dispatch(searchFetchedAction(response.data));
                // toast(getMessage('error', 'Successfully logged in!'), {
                //     position: toast.POSITION.TOP_CENTER,
                //     className: getClasses('success')
                // });
            })
            .catch(error => {
                dispatch(searchErrorFetchAction(error));
                toast(getMessage('error', 'Error in search!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}


export function tuplesFetch(q) {
    return dispatch => {
        dispatch(tuplesFetchingAction());
        axios
            .get(tuples)
            .then(response => {
                dispatch(tuplesFetchedAction(response.data));
                // toast(getMessage('error', 'Successfully logged in!'), {
                //     position: toast.POSITION.TOP_CENTER,
                //     className: getClasses('success')
                // });
            })
            .catch(error => {
                dispatch(tuplesErrorFetchAction(error));
                toast(getMessage('error', 'Error in search!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}