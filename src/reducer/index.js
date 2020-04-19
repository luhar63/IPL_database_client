import { combineReducers } from 'redux';
import home from 'Containers/Home/reducer';
import teams from 'Containers/Teams/reducer';
import players from 'Containers/Players/reducer';
import matches from 'Containers/Matches/reducer';
import stats from 'Containers/Stats/reducer';
import matchdetails from 'Containers/Match/reducer';
import playerdetails from 'Containers/Player/reducer';
import teamdetails from 'Containers/Team/reducer';
import { connectRouter } from 'connected-react-router';
import season from './season';
import team from './team';
import selectPlayer from './player';
// import { history } from '../store/configureStore';

export default history =>
    combineReducers({
        home,
        teams,
        players,
        teamdetails,
        season,
        team,
        matches,
        stats,
        matchdetails,
        playerdetails,
        selectPlayer,
        router: connectRouter(history)
    });
