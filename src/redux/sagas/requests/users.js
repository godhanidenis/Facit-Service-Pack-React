import axios from 'axios';

export function requestGetUsers() {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/users/`,
	});
}

export function requestCreateUsers(user) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/users/`,
		data: user,
	});
}

export function requestUpdateUsers(id, toBeUpdatedUser) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/users/${id}`,
		data: toBeUpdatedUser,
	});
}

export function requestDeleteUsers(userId) {
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/users/${userId}`,
	});
}
