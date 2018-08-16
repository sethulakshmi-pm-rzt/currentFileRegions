/**
 * Root Saga
 * @author Akshay
 */
import { all } from 'redux-saga/effects';
import { watcherSaga } from '../common/watcherSaga';

export default function* rootSaga(){
	yield all([
		watcherSaga()
	]);
}