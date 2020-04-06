import axios from 'axios';
import { match } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    matchDetailsFetchAction,
    matchDetailsFetchingAction,
    matchDetailsFetchedAction,
    matchDetailsErrorFetchAction
} from './actions';

export function matchDetailsReset() {
    return dispatch => {
        dispatch(matchDetailsFetchAction);
    };
}

export function fetchMatchDetails(matchId) {
    return dispatch => {
        dispatch(matchDetailsFetchingAction());
        axios
            .get(match, {
                params : {
                    matchid: matchId
                }
            })
            .then(response => {
                if(!response.data.errNum){
                    dispatch(matchDetailsFetchedAction(response.data));
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
                dispatch(matchDetailsErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching match details!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
