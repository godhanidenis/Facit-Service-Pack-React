import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function requestGetAgents(userId) {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageagent/?user_id=${userId}`,
	});
}

export function requestCreateAgents(agent) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageagent/`,
		data: agent,
	});
}

export function requestDeleteAgents(agentId) {
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageagent/${agentId}`,
	});
}

export function requestUpdateAgents(id, toBeUpdatedAgent) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageagent/${id}/`,
		data: toBeUpdatedAgent,
	});
}
