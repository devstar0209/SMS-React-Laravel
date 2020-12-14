import { TEACHER_CLASS } from './classconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case TEACHER_CLASS.TEACHER_SEND_CLASSES_LIST:
			return {
                ...state,
                classes: action.payload
			};
		case TEACHER_CLASS.TEACHER_SEND_CLASS_DETAIL:
			return {
                ...state,
				class: action.payload,
			};
		case TEACHER_CLASS.TEACHER_SEND_LOADING:
			return {
				loading: true
			}
		
		default:
			return state;
	}
}
