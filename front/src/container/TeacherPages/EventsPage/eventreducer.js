import { EVENT } from './eventconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case EVENT.TEACHER_SEND_EVENTS_LIST:
			return {
                ...state,
                events: action.payload
			};
		case EVENT.TEACHER_SEND_EVENT_DETAIL:
			return {
                ...state,
				event: action.payload.event,
			};
		
		case EVENT.TEACHER_SEND_LOADING:
			return{
				loading: true
			}
		
		default:
			return state;
	}
}
