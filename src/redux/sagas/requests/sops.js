import axios from 'axios';

export function requestGetSops(userId) {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managereporting/?user_id=${userId}`,
	});
}

export function requestUpdateSops(id, toBeUpdatedSop) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managereporting/${id}/`,
		data: toBeUpdatedSop,
	});
}
