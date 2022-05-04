import axios from 'axios';

export function requestGetLocations(userId) {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelocation/?user_id=${userId}`,
	});
}

export function requestCreateLocations(location) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelocation/`,
		data: location,
	});
}

export function requestDeleteLocations(locationId) {
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelocation/${locationId}`,
	});
}

export function requestUpdateLocations(id, toBeUpdatedLocation) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managelocation/${id}/`,
		data: toBeUpdatedLocation,
	});
}
