import { PROFILE } from './profileconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case PROFILE.TEACHER_SEND_PROFILE_DETAIL:
			return {
                ...state,
                profile: action.payload,
			};
		
		default:
			return state;
	}
}
