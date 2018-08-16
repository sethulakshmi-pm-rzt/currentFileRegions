/**
 * request.js;
 * @author Akshay
 */
import axios from "axios";

/**
 * common function to make API calls;
 * @param actions
 */
export function request(actions) {
	const { method, url, data, customHeaders } = actions.urlParams || actions;
	const headers = { ...customHeaders };
	if (data) {
		return axios({
			method,
			url: `/rest/${url}`,
			data,
			headers
		})
			.then(response => ({ response }))
			.catch(error => ({ error }));
	} else {
		return axios({
			method,
			url: `/rest/${url}`,
			headers
		})
			.then(response => ({ response }))
			.catch(error => ({ error }));
	}
}

/**
 * common function to make API calls related to files;
 * @param actions
 * @param cb
 */
export function fileRequest(actions, cb) {
	const { method, url, data } = actions.urlParams || actions;
	const headers = {
		"Content-Type": "multipart/form-data"
	};
	return axios({
		method,
		url: `/rest/${url}`,
		data,
		headers
	})
		.then(response => {
			if (cb) {
				cb();
			}
			return { response };
		})
		.catch(error => ({ error }));
}
