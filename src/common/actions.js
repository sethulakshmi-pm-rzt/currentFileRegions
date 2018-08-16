export function enableAction(name) {
	return {
		type: `ENABLE_${name}`,
		payload: {
			enable: true
		}
	};
}

export function disableAction(name) {
	return {
		type: `DISABLE_${name}`,
		payload: {
			enable: false
		}
	};
}

export function clearReducer(name) {
	return {
		type: `CLEAR_${name}`
	};
}

export function commonAction(
	action,
	actionType,
	method,
	url,
	data,
	customHeaders,
	cb,
	ecb
) {
	return {
		type: `${action}_${actionType}`,
		urlParams: {
			action,
			actionType,
			method,
			url,
			data,
			customHeaders,
			cb,
			ecb
		}
	};
}
