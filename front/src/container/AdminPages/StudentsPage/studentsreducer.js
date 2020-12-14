import { STUDENT } from './studentsconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
	contactflag: false,
	paymentflag: false,
	history: false
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case STUDENT.SEND_STUDENTS_LIST:
			return {
                ...state,
                students: action.payload
			};
		case STUDENT.SEND_STUDENT_DETAIL:
			return {
                ...state,
				student: action.payload.data,
				classes: action.payload.classes,
				makeup_classes: action.payload.makeup_classes,
				makeup_classes_history: action.payload.makeup_classes_history
			};
		case STUDENT.SEND_CLASSES_LIST:
			return {
                ...state,
				classes: action.payload
			};
		case STUDENT.GOTO_STUDENT_CONTACT_DETAIL:
			state.contactflag = true;
			return {
				...state,
				student_id: action.payload
			};
		case STUDENT.SEND_STUDENT_CONTACT_DETAIL:
			state.contactflag = true;
			return {
                ...state,
                student_contact: action.payload
			};
		case STUDENT.SEND_LOADING:
			return{
				loading: true
			}
		case STUDENT.SEND_STUDENT_PAYMENT:
			state.paymentflag = true;
			return {
				...state,
				student_payment: action.payload
			}
		case STUDENT.GOTO_DETAIL:
			state.contactflag = false;
			state.paymentflag = false;
			state.historyflag = false;
			return {
				...state
			}
		case STUDENT.REQUEST_ATTENDANCE_CLASSES:
			state.historyflag = true;
			return {...state}
		case STUDENT.SEND_ATTENDANCE_HISTORY:
			return {
				...state,
				attendance: action.payload.attendance,
				term: action.payload.term,
				start_day: action.payload.start_day,

			}
		default:
			return state;
	}
}
