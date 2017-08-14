
export const UPDATE_USER = 'update_user';

export function updateUser(user) {

	return {
		type: UPDATE_USER,
		payload: user
	}
}