import { ATTENDANCE } from './classconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case ATTENDANCE.ATTENDANCE_SEND_CLASSES_LIST:
			return {
                ...state,
                classes: action.payload
			};
		case ATTENDANCE.SEND_CLASS_STUDENT_ATTENDANCE:
			return {
                ...state,
				attendance: action.payload.attendance,
				classId: action.payload.class_id,
				className: action.payload.class_name,
				term: action.payload.term,
				startday: action.payload.startday,
			};
		case ATTENDANCE.ATTENDANCE_SEND_LOADING:
			return {
				loading: true
			}
		
		default:
			return state;
	}
}
