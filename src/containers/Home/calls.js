import axios from 'axios';
import { seasons } from 'Constants/api';
import { toast } from 'react-toastify';
import { getMessage, getClasses } from 'Constants/app';
import {
    loginFetchAction,
    loginFetchingAction,
    loginFetchedAction,
    loginErrorFetchAction
} from './actions';

export function loginReset() {
    return dispatch => {
        dispatch(loginFetchAction);
    };
}

export function loginFetch(email, password) {
    return dispatch => {
        dispatch(loginFetchingAction());
        axios
            .post(seasons, {
                email,
                password
            })
            .then(response => {
                dispatch(loginFetchedAction(response));
                toast(getMessage('error', 'Successfully logged in!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('success')
                });
            })
            .catch(error => {
                dispatch(loginErrorFetchAction(error));
                toast(getMessage('error', 'Error in login!'), {
                    position: toast.POSITION.TOP_CENTER,
                    className: getClasses('error')
                });
            });
    };
}
