import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function requestGetCategory() {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/managecategory/`,
	});
}
