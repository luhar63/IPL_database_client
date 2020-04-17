import objectAssign from 'object-assign';
import {
    TEAM_FETCH,
    TEAM_FETCHING,
    TEAM_FETCHED,
    TEAM_ERROR_FETCH
} from '../actions/team';

import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function teamReducer(state = initialState.team, action) {
    let newState;

    switch (action.type) {
    
    case TEAM_FETCH:
        // For this example, just simulating a save by changing date modified.
        // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
        return objectAssign({}, state, { isFetching: false, error: null, data: null });
    case TEAM_FETCHING:
        return objectAssign({}, state, { isFetching: true, error: null, data: null });

    case TEAM_FETCHED:
        newState = objectAssign({}, state);
        newState.data = action.payload;
        newState.isFetching = false;
        return newState;

    case TEAM_ERROR_FETCH:
        newState = objectAssign({}, state);
        newState.error = action.payload;
        newState.isFetching = false;
        return newState;

    default:
        return state;
    }
}
