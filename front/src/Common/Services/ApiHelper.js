import axios from 'axios';
import { securityService, userSessionService } from '.';
// import config from '../Config/AppConfig';

const CancelToken = axios.CancelToken;
const previousRequests = {};

const request = ({
	resourceUrl,
	method,
	data,
	params,
	responseType,
	doSendToken,
	cancelPrevious,
}) => {
	

	const config = {
		// url: `${process.env.REACT_APP_PROXY}/${process.env.REACT_APP_API_URL}/${resourceUrl}`,
		url: `${process.env.REACT_APP_API_URL}/${resourceUrl}`,
		method: method,
		responseType: responseType || 'json',
		data: data,
		params,
	};

	if (cancelPrevious && previousRequests[config.url]) {
		previousRequests[config.url].cancel();
	}

	if (doSendToken) {
		config.headers = {
			Authorization: securityService.getTokenForRequest(),
		};
	}

	return axios(config);
};

class ApiHelper {
	static get(resourceUrl, params) {
		
		return request({
			resourceUrl,
			method: 'get',
			params,
			doSendToken: true,
		}).then(
			response => response.data,
			({ response }) => Promise.reject((response && response.data && (response.data.error || response.data.errors)) || 'Some error occurred'),
		);
	}

	static post(resourceUrl, data, cancelPrevious) {
		
		return request({
			resourceUrl,
			method: 'post',
			data,
			doSendToken: true,
			cancelPrevious,
		}).then(
			response => response.data,
			({ response }) =>
				Promise.reject((response && response.data && (response.data.error || response.data.errors.note)) || 'Some error occurred'),
		);
	}

	static auth(resourceUrl, data, cancelPrevious) {
		return request({
			resourceUrl,
			method: 'post',
			data,
			doSendToken: false,
			cancelPrevious,
		}).then(
			response => response.data,
			({ response }) =>
				Promise.reject((response && response.data && (response.data.error || response.data.errors.note)) || 'Please insert correct Email and Password.'),
		);
	}

	static postwithout(resourceUrl, data, cancelPrevious) {
		
		return request({
			resourceUrl,
			method: 'post',
			data,
			doSendToken: false,
			cancelPrevious,
		}).then(
			response => response.data,
			({ response }) =>
				Promise.reject((response && response.data && (response.data.error || response.data.errors.note)) || 'Some error occurred'),
		);
	}

}

export default ApiHelper;
