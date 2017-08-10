import axios from 'axios';


export const FETCH_PROJECTS = 'fetch_projects';
export const FETCH_USER = 'fetch_user';

export function fetchProjects() {

	const request = axios.get("/api/projects/all")

	return {
		type: FETCH_PROJECTS,
		payload: request
	}
}

export function fetchUser() {
	const request = axios.get('/users/whoami')

	return {
		type: FETCH_USER,
		payload: request
	}
}

