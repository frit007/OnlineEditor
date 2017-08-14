import {UPDATE_USER} from '../actions'

export default function(state = null, action) {

	switch(action.type) {
		case UPDATE_USER:
		console.log(action);
			return action.payload; 
	}

	return state;
}