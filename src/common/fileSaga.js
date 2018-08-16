/**
 * fileSaga.js; a common saga for all file requests
 * @author Akshay
 */
import { call, put } from "redux-saga/effects";
import { enableAction, disableAction } from "./actions";
import { fileRequest } from "./request";

export function* fileSaga(actions) {
	const { action, actionType, cb, ecb } = actions.urlParams;
	yield put(enableAction("LOADER"));
	const { response, error } = yield call(fileRequest, actions);
	if (response) {
		yield put({
			type: `${action}_${actionType}_SUCCESS`,
			payload: { data: response.data.entity }
		});
		if (cb) {
			cb(response);
		}
		yield put(disableAction("LOADER"));
	} else {
		yield put(disableAction("LOADER"));
		yield put({
			type: `${action}_${actionType}_ERROR`,
			payload: { message: error.response.data.message }
		});
		if (ecb) {
			ecb(error.response.data);
		}
	}
}
