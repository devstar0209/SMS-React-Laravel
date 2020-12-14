import { DASHBOARD } from './dashboardconstants';

export const getInitialData = data => ({
	type: DASHBOARD.GET_INITIAL_DATA,
	payload: data,
});

export const approveMember = data => ({
	type: DASHBOARD.APPROVE_AS_MEMBER,
	payload: data
})