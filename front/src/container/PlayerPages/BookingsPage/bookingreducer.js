import { BOOKINGCLASS } from './bookingconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case BOOKINGCLASS.SEND_BOOKING_CLASSES_LIST:
			return {
                ...state,
                classes: action.payload
			};
		case BOOKINGCLASS.BOOKING_SEND_LOADING:
			return {
				loading: true
			}
		
		default:
			return state;
	}
}
