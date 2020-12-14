import { MEMBERSHIP } from './membershipconstants';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case MEMBERSHIP.SEND_MEMBERSHIP_DATA_SUCCESS:
			return {
                ...state,
				status: 1,
				member_fee: action.payload
			};
		case MEMBERSHIP.PAY_MEMBERSHIP_FEE_SUCCESS:
			return {
                ...state,
				status: 2,
			};
		
		default:
			return state;
	}
}
