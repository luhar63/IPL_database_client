import axios from 'axios';
import { player } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    playerDetailsFetchAction,
    playerDetailsFetchingAction,
    playerDetailsFetchedAction,
    playerDetailsErrorFetchAction
} from './actions';

export function playerDetailsReset() {
    return dispatch => {
        dispatch(playerDetailsFetchAction);
    };
}

export function fetchPlayerDetails(playerId) {
    return dispatch => {
        dispatch(playerDetailsFetchingAction());
        axios
            .get(player, {
                params : {
                    playerid: playerId
                }
            })
            .then(response => {
                if(!response.data.errNum){
                    dispatch(playerDetailsFetchedAction(response.data));
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
                dispatch(playerDetailsErrorFetchAction(error));
                toast(getMessage('error', 'Error in fetching player details!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
