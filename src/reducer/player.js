import objectAssign from 'object-assign';
import {
    PLAYER_SELECT_FETCH,
    PLAYER_SELECT_FETCHING,
    PLAYER_SELECT_FETCHED,
    PLAYER_SELECT_ERROR_FETCH
} from '../actions/player';

import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function playerSelectReducer(state = initialState.player, action) {
    let newState;

    switch (action.type) {

        case PLAYER_SELECT_FETCH:
            // For this example, just simulating a save by changing date modified.
            // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
            return objectAssign({}, state, { isFetching: false, error: null, data: null });
        case PLAYER_SELECT_FETCHING:
            return objectAssign({}, state, { isFetching: true, error: null, data: null });

        case PLAYER_SELECT_FETCHED:
            newState = objectAssign({}, state);
            newState.data = action.payload;
            newState.isFetching = false;
            return newState;

        case PLAYER_SELECT_ERROR_FETCH:
            newState = objectAssign({}, state);
            newState.error = action.payload;
            newState.isFetching = false;
            return newState;

        default:
            return state;
    }
}
