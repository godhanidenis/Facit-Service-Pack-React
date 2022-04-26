import axios from 'axios';

export function requestGetTeams(userId) {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteam/?user_id=${userId}`,
	});
}

export function requestCreateTeams(team) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteam/`,
		data: team,
	});
}

export function requestDeleteTeams(teamId) {
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteam/${teamId}`,
	});
}

export function requestUpdateTeams(id, toBeUpdatedTeam) {
	return axios.request({
		method: 'put',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteam/${id}/`,
		data: toBeUpdatedTeam,
	});
}
