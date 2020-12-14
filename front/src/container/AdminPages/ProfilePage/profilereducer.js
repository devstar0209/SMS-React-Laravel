import { PROFILE } from './profileconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case PROFILE.SEND_PROFILE_DETAIL:
			return {
                ...state,
                profile: action.payload.userprofile,
                payment: action.payload.payment,
			};
		
		default:
			return state;
	}
}
