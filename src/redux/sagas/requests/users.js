import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
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
		user,
	});
}

export function requestUpdateUsers(userId, userInfo) {
	return axios.request({
		method: 'put',
		url: `http://3.215.147.147/admin_panel/users/${userId}`,
		userInfo,
	});
}

export function requestDeleteUsers(userId) {
	return axios.request({
		method: 'delete',
		url: `http://3.215.147.147/admin_panel/users/${userId}`,
	});
}
