import { combineReducers } from 'redux';
import ReducerProjects from './reducer_projects';
import ReducerUser from './reducer_user';


const rootReducer = combineReducers({
  projects: ReducerProjects,
  user: ReducerUser
});


export default rootReducer;
