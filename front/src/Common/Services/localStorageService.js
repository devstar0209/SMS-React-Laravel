class LocalStorageService {
	static add(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static get(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	static remove(key) {
		localStorage.removeItem(key);
	}

	static addTokens(keys, accessToken, refreshToken) {
		localStorage.setItem(keys.access, JSON.stringify(accessToken));
		localStorage.setItem(keys.refresh, JSON.stringify(refreshToken));
	}
}

export default LocalStorageService;
