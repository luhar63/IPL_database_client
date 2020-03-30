import axios from 'axios';
import { matches } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    matchesFetchAction,
    matchesFetchingAction,
    matchesFetchedAction,
    matchesErrorFetchAction
} from './actions';

export function matchesReset() {
    return dispatch => {
        dispatch(matchesFetchAction);
    };
}

export function fetchMatches() {
    return dispatch => {
        dispatch(matchesFetchingAction());
        axios
            .get(matches)
            .then(response => {
                if(!response.data.errNum){
                    dispatch(matchesFetchedAction(response.data));
                }
                else {
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
                dispatch(matchesErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching matches!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
