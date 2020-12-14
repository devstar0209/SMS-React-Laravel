import { CLASS } from './classconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case CLASS.TEACHER_SEND_CLASSES_LIST:
			return {
                ...state,
                classes: action.payload
			};
		case CLASS.TEACHER_SEND_CLASS_STUDENT_ATTENDANCE:
			return {
                ...state,
				attendance: action.payload.attendance,
				makeup_attendance: action.payload.makeup_attendance,
				classId: action.payload.class_id,
				className: action.payload.class_name,
				term: action.payload.term,
				startday: action.payload.startday,
			};
		case CLASS.TEACHER_SEND_LOADING:
			return {
				loading: true
			}
		
		default:
			return state;
	}
}
