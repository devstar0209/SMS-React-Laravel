import { CLASS } from './classconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case CLASS.SEND_CLASSES_LIST:
			return {
                ...state,
                classes: action.payload
			};
		case CLASS.SEND_CLASS_DETAIL:
			return {
                ...state,
				class: action.payload.class,
				coaches: action.payload.coaches,
				students: action.payload.students,
			};
		case CLASS.SEND_CLASS_CREATE_ROUTE:
			return {
                ...state,
                coaches: action.payload
			};
		case CLASS.SEND_LOADING:
			return {
				loading: true
			}
		
		default:
			return state;
	}
}
