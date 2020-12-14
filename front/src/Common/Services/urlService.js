import queryString from 'query-string';
import { matchPath } from 'react-router-dom';

export default class urlService {
	static getQueryParam(location, paramName) {
		return queryString.parse(location.search)[paramName];
	}

	static createQueryParamString(location, property, value) {
		const query = queryString.parse(location.search);

		query[property] = value;
		return `${location.pathname}?${queryString.stringify(query)}`;
	}

	static formatString(stringToFormat, ...rest) {
		const args = Array.prototype.slice.call(rest, 0);
		return stringToFormat.replace(/{(\d+)}/g, (match, number) => (typeof args[number] !== 'undefined' ? args[number] : match));
	}

	static getParams = (currentPathname, pathToMatch) => {
		const matchProfile = matchPath(currentPathname, {
			path: pathToMatch,
		});
		return (matchProfile && matchProfile.params && matchProfile.params.id) || null;
	};
}
