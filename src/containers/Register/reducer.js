import objectAssign from 'object-assign';
import {
    LOGIN_FETCH,
    LOGIN_FETCHING,
    LOGIN_FETCHED,
    LOGIN_ERROR_FETCH
} from './constant';

import initialState from '../../reducer/initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function loginReducer(state = initialState.user, action) {
    let newState;

    switch (action.type) {
    case LOGIN_FETCH:
        // For this example, just simulating a save by changing date modified.
        // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
        return objectAssign({}, state, {
            isLoading: false,
            error: null,
            data: null
        });
    case LOGIN_FETCHING:
        return objectAssign({}, state, {
            isLoading: true,
            error: null,
            data: null
        });

    case LOGIN_FETCHED:
        newState = objectAssign({}, state);
        newState.data = action.payload;
        newState.isLoading = false;
        return newState;

    case LOGIN_ERROR_FETCH:
        newState = objectAssign({}, state);
        newState.error = action.payload;
        newState.isLoading = false;
        return newState;

    default:
        return state;
    }
}
