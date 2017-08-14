import {FILE_SELECTED} from '../actions';

export default function(state = null, action) {
	
	switch(action.type) {
		case FILE_SELECTED:
			return action.payload;
	}
	
	return state;
}