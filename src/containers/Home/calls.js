import axios from 'axios';
import { search } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    searchFetchAction,
    searchFetchingAction,
    searchFetchedAction,
    searchErrorFetchAction
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
