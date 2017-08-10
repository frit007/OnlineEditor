import { combineReducers } from 'redux';
import ActiveFileReducer from './reducer_active_file';
import FilesReducer from './reducer_files';

const rootReducer = combineReducers({
  files: FilesReducer,
  activeFile: ActiveFileReducer
});

export default rootReducer;
