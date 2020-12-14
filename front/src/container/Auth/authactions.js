import { AUTH } from './authconstants';
import { securityService } from '../../Common/Services';

export const submitLoginAction = data => ({
	type: AUTH.SUBMIT_LOGIN,
	payload: data,
});

export const logoutAction = () => ({
	type: AUTH.LOGOUT,
	payload: {},
});

export const isLoggedInAction = () => ({
	type: AUTH.IS_LOGGED_IN,
	payload: securityService.isLoggedIn(),
});

export const signUpAction = userData => ({
	type: AUTH.SIGN_UP,
	payload: userData,
});

export const registerTeacher = data => ({
	type: AUTH.STUDENT_REGISTER,
	payload: data
});

export const forgotPasswordAction = userData => ({
	type: AUTH.FORGOT_PASSWORD,
	payload: userData,
});

export const resetPasswordAction = userData => ({
	type: AUTH.RESET_PASSWORD,
	payload: userData,
});

export const registerParent = data => ({
	type: AUTH.PARENT_REGISTER,
	payload: data
});

export const registerPlayer = data => ({
	type: AUTH.PLAYER_REGISTER,
	payload: data
});
