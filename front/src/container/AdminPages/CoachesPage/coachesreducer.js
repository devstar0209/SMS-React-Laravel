import { COACHES } from './coachesconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case COACHES.SEND_COACHES_LIST:
			return {
                ...state,
                coaches: action.payload
			};
		case COACHES.SEND_COACHE_DETAIL:
			return {
                ...state,
                coache: action.payload,
			};
		case COACHES.SEND_COACHE_CREATE_ROUTE:
			return {
                ...state,
                classes: action.payload
			};
		case COACHES.SEND_LOADING:
			return {
				loading: true
			};
		case COACHES.SEND_PASSWORD:
			return{
				...state,
				coache: action.payload
			}
		
		default:
			return state;
	}
}
