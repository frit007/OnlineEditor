import { FETCH_PROJECTS } from '../actions'

export default function(state = [], action) {
	
	switch(action.type) {
		case FETCH_PROJECTS:
			console.warn("action", action);
			return action.payload.data;
	}
	
	return state;
}