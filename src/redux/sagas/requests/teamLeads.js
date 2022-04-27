import axios from 'axios';

export function requestGetTeamLeads(userId) {
	return axios.request({
		method: 'get',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteamlead/?user_id=${userId}`,
	});
}

export function requestCreateTeamLeads(teamLead) {
	return axios.request({
		method: 'post',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteamlead/`,
		data: teamLead,
	});
}

export function requestDeleteTeamLeads(teamLeadId) {
	return axios.request({
		method: 'delete',
		url: `${process.env.REACT_APP_DOMAIN}/admin_panel/manageteamlead/${teamLeadId}`,
	});
}
