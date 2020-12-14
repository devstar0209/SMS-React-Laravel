import axios from 'axios';
import ApiHelper from './ApiHelper';
import resources from '../Constants/resources';
import { securityService } from '.';
import LocalStorageService from './localStorageService';
import { getIsLoaderActive } from '../../Features/Home/HomeSelectors';

export default class InterceptorService {
	static setupResponseInterceptors(toggleLoaderAction, store) {
		axios.interceptors.request.use((request) => {
			if (!getIsLoaderActive(store.getState())) {
				toggleLoaderAction();
			}
			return request;
		});
		axios.interceptors.response.use(
			(response) => {
				if (getIsLoaderActive(store.getState())) {
					toggleLoaderAction();
				}
				return response;
			},
			(error) => {
				const { response } = error;
				const { url } = response.config;

				if (getIsLoaderActive(store.getState())) {
					toggleLoaderAction();
				}

				if (response && response.status === 401 && !url.includes('/auth')) {
					const refreshToken = LocalStorageService.get('avail_refresh_token');
					const params = {
						refresh_token: refreshToken,
					};

					return ApiHelper.get('auth', resources.refreshToken, params).then((newTokenResponse) => {
						const { access_token, refresh_token } = newTokenResponse;

						securityService.login(access_token, refresh_token);

						error.config.headers.Authorization = `Bearer ${access_token}`;

						return axios.request(error.config);
					});
				}

				return Promise.reject(error);
			},
		);
	}
}
