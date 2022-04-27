import axios from 'axios';

export function requestGetTeams(userId) {
	return axios.request({
		method: 'get',
		url: `http://3.215.147.147/admin_panel/manageteam/?user_id=${userId}`,
	});
}

export function requestCreateTeams(team) {
	return axios.request({
		method: 'post',
		url: 'http://3.215.147.147/admin_panel/manageteam/',
		data: team,
	});
}

export function requestDeleteTeams(teamId) {
	return axios.request({
		method: 'delete',
		url: `http://3.215.147.147/admin_panel/manageteam/${teamId}`,
	});
}

export function requestUpdateTeams(id, toBeUpdatedTeam) {
	return axios.request({
		method: 'put',
		url: `http://3.215.147.147/admin_panel/manageteam/${id}/`,
		data: toBeUpdatedTeam,
	});
}
