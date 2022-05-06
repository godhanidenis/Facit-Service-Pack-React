import axios from 'axios';

export function requestGetSubSops(id, slug) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/getsopelasticsearch/?user_id=${id}`,
		data: slug,
	});
}

export function requestCreateSubSops(subSop) {
	console.log('subSop...Id', subSop);

	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/sopelasticsearch/`,
		data: subSop,
	});
}

export function requestDeleteSubSops(subSopId) {
	console.log('subSopId', subSopId);
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/sopelasticsearch/`,
		data: subSopId,
	});
}

export function requestUpdateSubSops(id, record) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/sopelasticsearch/`,
		data: { id, record },
	});
}
