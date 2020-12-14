import LocalStorageService from './localStorageService';

const AUTH_TOKEN_KEYS = {
	access: 'access_token',
	refresh: 'refresh_token',
};

const IS_REMEMBER_ME = 'rememberMe';
const CACHED_LOGIN_INFO = 'logininfo';

export default class SecurityService {
	static login(accessToken, refreshToken) {
		LocalStorageService.addTokens(AUTH_TOKEN_KEYS, accessToken, refreshToken);
	}

	static logout() {
		LocalStorageService.remove(AUTH_TOKEN_KEYS.access);
		LocalStorageService.remove(AUTH_TOKEN_KEYS.refresh);
		LocalStorageService.remove('cachedUserInfo');
		LocalStorageService.remove('finishedAccountSetup');
		LocalStorageService.remove('user');
	}

	static getTokenForRequest() {
		return `Bearer ${this.getToken()}`;
	}

	static getToken() {
		return LocalStorageService.get(AUTH_TOKEN_KEYS.access);
	}

	static isLoggedIn() {
		return LocalStorageService.get(AUTH_TOKEN_KEYS.access) !== null;
	}

	static isCheckedRemeberMe(){
		return LocalStorageService.get(IS_REMEMBER_ME) !==  null ?LocalStorageService.get(IS_REMEMBER_ME): false ;
	}

	static getLoginInfo(){
		return LocalStorageService.get(CACHED_LOGIN_INFO);
	}

	static setRememberMe(loginData) {
		LocalStorageService.add(IS_REMEMBER_ME, true);
		LocalStorageService.add(CACHED_LOGIN_INFO, loginData);
	}

	static removeRememberMe() {
		LocalStorageService.remove(IS_REMEMBER_ME);
		LocalStorageService.remove(CACHED_LOGIN_INFO);
		
	}
}
