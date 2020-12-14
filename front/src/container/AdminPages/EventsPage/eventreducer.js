import { EVENT } from './eventconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case EVENT.SEND_EVENTS_LIST:
			return {
                ...state,
                events: action.payload
			};
		case EVENT.SEND_EVENT_DETAIL:
			return {
                ...state,
				event: action.payload.event,
				coaches: action.payload.coaches,
                students: action.payload.students
			};
		case EVENT.SEND_EVENT_CREATE_ROUTE:
			return {
                ...state,
                coaches: action.payload.coaches,
                students: action.payload.students
			};
		case EVENT.SEND_LOADING:
			return{
				loading: true
			}
		
		default:
			return state;
	}
}
