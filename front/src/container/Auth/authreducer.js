import { AUTH } from './authconstants';

import {
	securityService,
} from '../../Common/Services';

export const initialState = {
	isLoggedIn: false,
	isLoading: false,
	student: null
};

export default function (state = initialState, action) {

	switch (action.type) {
		case AUTH.SUBMIT_LOGIN_LOADING:
			state.isLoading = true;
			return{
				isLoading: state.isLoading
			}
		case AUTH.SUBMIT_LOGIN_SUCCESS:
			state.isLoggedIn = true;
			state.isLoading = false;
			return {
				...state,
				logininfo: securityService.getLoginInfo(),
				isLoggedIn: state.isLoggedIn,
				isLoading: state.isLoading,
			};
		case AUTH.LOGOUT_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
			};
		case AUTH.IS_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case AUTH.AUTH_FAILED:
			state.isLoading = false;
			return{
				isLoading: state.isLoading
			}
		
		default:
			return state;
	}
}
