import axios from 'axios';
import { playersPerTeam } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    playersFetchAction,
    playersFetchingAction,
    playersFetchedAction,
    playersErrorFetchAction
} from './actions';

export function playersReset() {
    return dispatch => {
        dispatch(playersFetchAction);
    };
}

export function fetchPlayers() {
    return dispatch => {
        dispatch(playersFetchingAction());
        axios
            .get(playersPerTeam)
            .then(response => {
                if(!response.data.errNum){
                    dispatch(playersFetchedAction(response.data));
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
                dispatch(playersErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching players!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
