import axios from 'axios';
console.log('::::', process.env.REACT_APP_DOMAIN);
export function requestGetUsers() {
	return axios.request({
		method: 'get',
		url: 'http://3.215.147.147/admin_panel/users/',
	});
}

export function requestCreateUsers(user) {
	return axios.request({
		method: 'post',
		url: 'http://3.215.147.147/admin_panel/users/',
		data: user,
	});
}

export function requestUpdateUsers(id, toBeUpdatedUser) {
	return axios.request({
		method: 'put',
		url: `http://3.215.147.147/admin_panel/users/${id}`,
		data: toBeUpdatedUser,
	});
}

export function requestDeleteUsers(userId) {
	return axios.request({
		method: 'delete',
		url: `http://3.215.147.147/admin_panel/users/${userId}`,
	});
}
