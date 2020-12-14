import { KIDEVENT } from './eventconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case KIDEVENT.SEND_KIDEVENTS_LIST:
			return {
                ...state,
                events: action.payload
			};
		case KIDEVENT.SEND_KIDEVENT_DETAIL:
			return {
                ...state,
				event: action.payload.event,
				coaches: action.payload.coaches,
                students: action.payload.students
			};
		case KIDEVENT.SEND_LOADING:
			return{
				loading: true
			}
		
		default:
			return state;
	}
}
