/**
 * common reducer function for enable
 * @param name
 * @returns reducer for corresponding name
 * @author Akshay
 */
export function enableWithNamedType(name = "") {
	const initialState = { enable: false };
	return function enableDisable(state = initialState, action) {
		switch (action.type) {
			case `ENABLE_${name}`:
				return { ...state, ...action.payload };
			case `DISABLE_${name}`:
				return { ...state, ...action.payload };
			default:
				return state;
		}
	};
}

/**
 * common reducer function for data
 * @param name
 * @returns reducer for corresponding name
 * @author Akshay
 */
export function fetchWithNamedType(name = "") {
	const initialState = { data: { userId: null } };
	return function counter(state = initialState, action) {
		switch (action.type) {
			// upload file
			case `UPLOAD_${name}`:
			case `UPLOAD_${name}_SUCCESS`:
			case `UPLOAD_${name}_ERROR`:
      case `UPDATE_${name}`:
      case `UPDATE_${name}_SUCCESS`:
      case `UPDATE_${name}_ERROR`:
      case `PROCEED_${name}`:
      case `PROCEED_${name}_SUCCESS`:
      case `PROCEED_${name}_ERROR`:
				return { ...state, ...action.payload };
			case `CLEAR_${name}`:
				return initialState;
			default:
				return state;
		}
	};
}
