import {LOAD_FILES} from '../actions';

export default function(state = null, action) {
	
	switch(action.type)	{
		case LOAD_FILES:
			return action.payload.data;
	}

	return state;
} 