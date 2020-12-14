import { STUDENT } from './studentsconstants';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case STUDENT.TEACHER_SEND_STUDENTS_LIST:
			return {
                ...state,
                students: action.payload
			};
		case STUDENT.TEACHER_SEND_STUDENT_DETAIL:
			return {
				...state,
                personal: action.payload.personal,
                contact: action.payload.contact,
                payment: action.payload.payment,
			};
		case STUDENT.TEACHER_SEND_LOADING:
			return {
				loading: true
			};
		
		default:
			return state;
	}
}
