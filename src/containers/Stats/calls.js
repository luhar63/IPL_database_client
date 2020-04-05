import axios from 'axios';
import { stats } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    statsFetchAction,
    statsFetchingAction,
    statsFetchedAction,
    statsErrorFetchAction
} from './actions';

export function statsReset() {
    return dispatch => {
        dispatch(statsFetchAction);
    };
}

export function fetchMatches() {
    return dispatch => {
        dispatch(statsFetchingAction());
        axios
            .get(stats, {q:'something'})
            .then(response => {
                if(!response.data.errNum){
                    dispatch(statsFetchedAction(response.data));
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
                dispatch(statsErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching stats!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
