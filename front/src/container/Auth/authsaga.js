import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../Common/Services/ApiHelper';
import { AUTH } from './authconstants';
import resources from '../../Common/Constants/resources';
import {
	userSessionService,
	notificationService,
	localStorageService,
	securityService,
	urlService,
} from '../../Common/Services';

export function* submitLogin(action) {
	try {
		yield put({
			type: AUTH.SUBMIT_LOGIN_LOADING,
		});
		const response = yield call(ApiHelper.auth, resources.login,action.payload);
		if(response){
			const {token, user} = response;
			const access_token = token;
			const refresh_token = token;

			yield userSessionService.setCachedUserInfo(user);
			yield securityService.login(access_token, refresh_token);

			yield put({
				type: AUTH.SUBMIT_LOGIN_SUCCESS,
			});

			switch(user.grade) {
				case 0:
					if(user.userprofile != undefined && user.userprofile != null)
						yield put(push('/admin/dashboard'));
					else yield put(push('/admin/profile'));
					break;
				case 1:
					yield put(push('/page/welcome'));
					break;
				case 2:
					yield put(push('/player/welcome'));
					break;
				case 3:
					yield put(push('/parent/welcome'));
					break;
			}

			
		}

	} catch (e) {
		yield put({
			type: AUTH.AUTH_FAILED,
		});
		yield notificationService.error(e);
	}
}

export function* logout() {
	yield securityService.logout();
	yield localStorageService.remove('cachedUserInfo');
	yield localStorageService.remove('finishedAccountSetup');
	yield put(push('/'));
	yield put({
		type: AUTH.LOGOUT_SUCCESS,
	});
}

function* signUp(action) {
	try {
		yield put({
			type: AUTH.SUBMIT_LOGIN_LOADING,
		});
	
		const response = yield call(ApiHelper.auth, resources.signup, action.payload, null);
		const {is_member, id} = response;

		yield put({
			type: AUTH.SUBMIT_LOGIN_SUCCESS,
		});
		
		if(is_member === true) {
			yield all([
				put(push('/pla/membership/'+id)),
			]);
		}else{
			yield all([
				put(push('/login')),
			]);
		}

		yield notificationService.success('Registered successfully')
	} catch (e) {
		yield put({
			type: AUTH.AUTH_FAILED,
		});
		yield notificationService.error(e);
	}
}

function* forgotPassword(action) {
	try{
		yield call(ApiHelper.postWithoutToken, resources.forgotpassword, null, action.payload);
		yield all([
			notificationService.success('You successfully sent reset password request to Fixapp'),
			put(push('/check-email-confirm'))
		])
	} catch (e) {
		yield notificationService.error(e)
	}
}

function* resetPassword(action) {
	
	try{
		yield call(ApiHelper.putWithoutToken, resources.resetpassword, action.payload);
		yield all([
			notificationService.success('You successfully reset password'),
			put(push('/login'))
		])
	} catch (e) {
		yield notificationService.error(e)
	}
}

function* studentRegister(action) {
	try{
		yield put({
			type: AUTH.SUBMIT_LOGIN_LOADING,
		});
	
		yield call(ApiHelper.postwithout, resources.user.registerTeacher, action.payload);
		yield all([
			notificationService.success('Registered successfully'),
			put(push('/login'))
		]) 
	} catch(e) {
		yield put({
			type: AUTH.AUTH_FAILED,
		});
		yield notificationService.error(e)
	}
}

function* parentRegister(action) {
	try{
		yield put({
			type: AUTH.SUBMIT_LOGIN_LOADING,
		});
	
		yield call(ApiHelper.postwithout, resources.parent.register, action.payload);
		yield all([
			put(push('/par/login'))
		]);
		yield notificationService.success('Registered successfully')
		yield put({
			type: AUTH.SUBMIT_LOGIN_SUCCESS,
		});
	} catch(e) {
		yield put({
			type: AUTH.AUTH_FAILED,
		});
		yield notificationService.error(e)
	}
}

function* playerRegister(action) {
	try{
		yield put({
			type: AUTH.SUBMIT_LOGIN_LOADING,
		});
	
		const response = yield call(ApiHelper.postwithout, resources.player.register, action.payload);
		const {is_member, id} = response;
		
		if(is_member === true) {
			yield all([
				put(push('/pla/membership/'+id)),
				put({
					type: AUTH.SUBMIT_LOGIN_SUCCESS,
				}),
			]);
			 
		}
		else {
			yield all([
				put(push('/pla/login')),
				put({
					type: AUTH.SUBMIT_LOGIN_SUCCESS,
				})
			]);
		}
		yield notificationService.success('Registered successfully')
	} catch(e) {
		yield put({
			type: AUTH.AUTH_FAILED,
		});
		yield notificationService.error(e)
	}
}

export default function* authSaga() {
	yield takeLatest(AUTH.SUBMIT_LOGIN, submitLogin);
	yield takeLatest(AUTH.LOGOUT, logout);
	yield takeLatest(AUTH.SIGN_UP, signUp);
	yield takeLatest(AUTH.FORGOT_PASSWORD, forgotPassword);
	yield takeLatest(AUTH.RESET_PASSWORD, resetPassword);
	yield takeLatest(AUTH.STUDENT_REGISTER, studentRegister);
	yield takeLatest(AUTH.PARENT_REGISTER, parentRegister);
	yield takeLatest(AUTH.PLAYER_REGISTER, playerRegister);

}
