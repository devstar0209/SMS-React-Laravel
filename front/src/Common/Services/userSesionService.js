import LocalStorageService from './localStorageService';

const CACHED_USER_INFO = 'cachedUserInfo';
const ACCOUNT_SETUP_FINISHED = 'finishedAccountSetup';

export default class UserSessionService {
	static setCachedUserInfo(user) {
		LocalStorageService.add(CACHED_USER_INFO, user);
	}

	static getCachedUserInfo() {
		return LocalStorageService.get(CACHED_USER_INFO);
	}

	static getUserGrade(){
		return LocalStorageService.get(CACHED_USER_INFO)['grade'];
	}

	static setAccountSetupStatus(status) {
		LocalStorageService.add(ACCOUNT_SETUP_FINISHED, status);
	}

	static getAccountSetupStatus(status) {
		return LocalStorageService.add(ACCOUNT_SETUP_FINISHED, status);
	}
}
