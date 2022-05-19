import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function requestGetSkillSetList(id, slug) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/getsopelasticsearch/?user_id=${id}`,
		data: slug,
	});
}

export function requestUpdateSkillSetList(id, record) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/sopelasticsearch/`,
		data: { id, record },
	});
}
