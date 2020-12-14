import { REPORT } from './reportconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case REPORT.SEND_REPORT_DATA:
			return {
                ...state,
                data: action.payload,
			};
		
		default:
			return state;
	}
}
