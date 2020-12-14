import { PLAYERCLASS } from './classconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case PLAYERCLASS.SEND_PLAYER_CLASSES_LIST:
			return {
                ...state,
                classes: action.payload
			};
		case PLAYERCLASS.GOTO_PLAYER_CLASS_PAYMENT:
			return {
                ...state,
				class: action.payload,
			};
		case PLAYERCLASS.SEND_LOADING:
			return {
				loading: true
			}
		
		default:
			return state;
	}
}
