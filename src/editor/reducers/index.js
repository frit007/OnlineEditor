import { combineReducers } from 'redux';
import ActiveFileReducer from './reducer_active_file';
import FilesReducer from './reducer_files';
import UserReducer from '../../projects/reducers/reducer_user'

const rootReducer = combineReducers({
  files: FilesReducer,
  activeFile: ActiveFileReducer,
  user: UserReducer
});

export default rootReducer;
