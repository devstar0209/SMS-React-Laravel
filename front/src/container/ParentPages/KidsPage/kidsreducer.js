import { KID } from './kidsconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
	contactflag: false,
	paymentflag: false,
	history: false,
	eventflag: false
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case KID.SEND_KIDS_LIST:
			return {
                ...state,
                students: action.payload
			};
		case KID.SEND_KID_DETAIL:
			return {
                ...state,
				student: action.payload.data,
				classes: action.payload.classes,
				makeup_classes: action.payload.makeup_classes,
				makeup_classes_history: action.payload.makeup_classes_history
			};
		case KID.SEND_KID_CLASSES_LIST:
			return {
				...state,
				classes: action.payload
			}
		case KID.GOTO_KID_CONTACT_DETAIL:
			state.contactflag = true;
			return {
				...state,
				student_id: action.payload
			};
		case KID.SEND_KID_CONTACT_DETAIL:
			state.contactflag = true;
			return {
				...state,
				student_contact: action.payload
			};
		case KID.SEND_LOADING:
			return{
				loading: true
			}
		case KID.SEND_KID_PAYMENT:
			state.paymentflag = true;
			return {
				...state,
				student_payment: action.payload
			}
		case KID.GOTO_DETAIL:
			state.contactflag = false;
			state.paymentflag = false;
			state.historyflag = false;
			return {
				...state
			}
		case KID.REQUEST_ATTENDANCE_CLASSES:
			state.historyflag = true;
			return {...state}
		case KID.SEND_ATTENDANCE_HISTORY:
			return {
				...state,
				attendance: action.payload.attendance,
				term: action.payload.term,
				start_day: action.payload.start_day,

			}
		case KID.SEND_KID_EVENTS:
			state.eventflag = true;
			return {
				...state,
			}
		default:
			return state;
	}
}
