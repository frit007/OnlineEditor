import axios from 'axios';


const userAction = require('./actions-user');
import * as userActions from './actions-user';
// console.warn("user action",userActions);
// export userAction;
// export const z = {
// 	a:31
// }


export const FETCH_PROJECTS = 'fetch_projects';
export const UPDATE_USER = 'update_user';

export function fetchProjects(user_id) {
	console.log("user_id", user_id);
	const request = axios.get("/api/projects/by_user/"+user_id)

	return {
		type: FETCH_PROJECTS,
		payload: request
	}
}

export function updateUser(user) {

	return {
		type: UPDATE_USER,
		payload: user
	}
}

