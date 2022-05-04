import axios from 'axios';

export function requestGetLobs(userId) {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelob/?user_id=${userId}`,
	});
}

export function requestCreateLobs(lob) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelob/`,
		data: lob,
	});
}

export function requestDeleteLobs(lobId) {
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelob/${lobId}`,
	});
}

export function requestUpdateLobs(id, toBeUpdatedLobs) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelob/${id}/`,
		data: toBeUpdatedLobs,
	});
}
