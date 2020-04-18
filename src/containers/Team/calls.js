import axios from 'axios';
import { team } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    teamDetailsFetchAction,
    teamDetailsFetchingAction,
    teamDetailsFetchedAction,
    teamDetailsErrorFetchAction
} from './actions';

export function teamDetailsReset() {
    return dispatch => {
        dispatch(teamDetailsFetchAction);
    };
}

export function fetchTeamDetails(teamId) {
    return dispatch => {
        dispatch(teamDetailsFetchingAction());
        axios
            .get(team, {
                params : {
                    teamid: teamId
                }
            })
            .then(response => {
                if(!response.data.errNum){
                    dispatch(teamDetailsFetchedAction(response.data));
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
                dispatch(teamDetailsErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching team details!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
