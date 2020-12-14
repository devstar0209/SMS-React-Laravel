import { DASHBOARD } from './dashboardconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
	// isLoggedIn: false,
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case DASHBOARD.SEND_INITAIL_DATA:
			// state.isLoggedIn = true;
			// state.isLoading = false;
			return {
                ...state,
                tabledata: action.payload.tabledata,
                attendance: action.payload.attendance,
                checkouthistory: action.payload.checkouthistory,
                inactivestudents: action.payload.inactivestudents,
                members: action.payload.members,
			};
		case DASHBOARD.APPROVED_AS_MEMBER:
			return {
				...state,
				members: action.payload
			}
		default:
			return state;
	}
}
