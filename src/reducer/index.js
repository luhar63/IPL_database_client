import { combineReducers } from 'redux';
import home from 'Containers/Home/reducer';
import teams from 'Containers/Teams/reducer';
import matches from 'Containers/Matches/reducer';
import { connectRouter } from 'connected-react-router';
import season from './season';
// import { history } from '../store/configureStore';

export default history =>
    combineReducers({
        home,
        teams,
        season,
        matches,
        router: connectRouter(history)
    });
