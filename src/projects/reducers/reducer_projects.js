import { FETCH_PROJECTS } from '../actions'

export default function(state = [], action) {
	
	switch(action.type) {
		case FETCH_PROJECTS:
			return action.payload;
	}
	
	return state;
}