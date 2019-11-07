import {NativeModules, Alert } from 'react-native';
import { call, put, takeEvery, select} from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import I18n from 'react-native-i18n';
import Define from 'payment/configs/define.js';
import {store} from 'payment/store/index.js';
import { actionTypes } 		from 'payment/store/actions/common';
import * as actions 		from 'payment/store/actions/common';
import * as actionsUser 	from 'payment/store/actions/user';
import * as actionsBasic 	from 'payment/store/actions/basic';

import * as Axios       	from 'payment/services';

async function doLogInRequest(baseURL, data) {
	await Axios.configAxios(baseURL);
  	return await Axios.post('user/auth', data);
};

async function doResgiterRequest(baseURL, data) {
	await Axios.configAxios(baseURL);
  	return await Axios.post('user/signup', data);
};

async function doLogOutRequest () {
	await Axios.clearCookie();
	return true;
};

const doLogIn = function* doLogIn (action) {
	try {
		yield put(actions.changeLoadingStatus(true));
		const response = yield call(doLogInRequest, action.baseURL, action.data);
		console.log('doLogInRequest', response);
		if (typeof response.Error != 'undefined') {
			yield put({ type: actionTypes.LOG_OUT, isLogout: true, isLogin: false, session: {} });
			yield put({ type: actionTypes.DO_LOGIN_STATUS, loginStatus: false });
			Alert.alert('RexWallet', response.msg ? response.msg : 'Login error');
		} else {
			if (response.success) {
				yield put(actions.changeLoadingStatus(false));
				let session = {
					cookie: response.token,
					token: response.token,
					userid: response.rows.UserName,
					url: action.baseURL,
					appType : 'App-RexWallet',
					
				}
				yield call(Axios.configTokenAxios, session);
				yield put({ type: actionTypes.DO_LOGIN_STATUS, loginStatus: true });
				yield put({ type: actionTypes.LOG_IN, isLogout: false, isLogin: true, session: session });
				yield put(actionsBasic._updateBasicData(session));
				yield put(actionsUser._updateUserData(response.rows));
			}
			else {
				yield put(actions.changeLoadingStatus(false));
				yield put({ type: actionTypes.LOG_OUT, isLogout: true, isLogin: false, session: {} });
				yield put({ type: actionTypes.DO_LOGIN_STATUS, loginStatus: false });
				Alert.alert('RexWallet', response.msg ? response.msg : (response.session ? response.session : I18n.t('msg.login_error')));
			}
		}
	} catch (e) {
		yield put(actions.changeLoadingStatus(false));
		console.log('doLogInRequestError', e);
		yield put({ type: actionTypes.DO_LOGIN_STATUS, loginStatus: false });
		yield put({ type: actionTypes.LOG_OUT, isLogout: true, isLogin: false, session: {} });
	}
}

const doResgiter = function* doResgiter (data) {
	try {
		console.log('aaaaaaaaaaa', data);
		yield put(actions.changeLoadingStatus(true));
		const response = yield call(doResgiterRequest, 'https://rextech.io/api/v1/', data.data);
		console.log('doResgiter', response);
		if (typeof response.Error != 'undefined') {
			yield put(actions.changeLoadingStatus(false));
			Alert.alert('RexWallet', response.msg ? response.msg : 'Login error');
		} else {
			if (response.success) {
				yield put(actions.changeLoadingStatus(false));
				Alert.alert('RexWallet', response.msg);
			}
			else {
				yield put(actions.changeLoadingStatus(false));
				Alert.alert('RexWallet', response.msg);
			}
		}
	} catch (e) {
		console.log('doLogInRequestError', e);
		yield put(actions.changeLoadingStatus(false));
		Alert.alert('RexWallet', response.msg);
	}
}

const doLogOut = function* doLogOut (action) {
	try {
		yield call(Axios.clearCookie);
		yield put({ type: actionTypes.LOG_OUT, isLogout: true, isLogin: false, session: null });

	} catch (e) {
		yield put({ type: actionTypes.LOG_OUT, isLogout: true, isLogin: false, session: null });
	}
}

const changeApiLoadingStatus = function* changeApiLoadingStatus (action) {
	try {
		yield put({ type: actionTypes.CHANGE_API_LOADING_STATUS, apiWating: action.apiWating});
	} catch (e) {
		yield put({ type: actionTypes.CHANGE_API_LOADING_STATUS, apiWating: false});
	}
}	

const doCheckPinCode = function* doCheckPinCode (action) {
	yield put({ type: actionTypes.CHANGE_LOADING_STATUS_PINCODE, status_pincode: 1});
	try {
		const response = yield call(Axios.post, 'user/check_pass_code', action.data, {loading: false});
		if (typeof response.Error !== 'undefined') {
			yield put({ type: actionTypes.CHANGE_LOADING_STATUS_PINCODE, status_pincode: 2});
			if(action.data.turn_off){
				yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 2});
			}
		} else {
			if (response.success) {
				//console.log('phuoc1',action.data);
				yield put({ type: actionTypes.CHANGE_LOADING_STATUS_PINCODE, status_pincode: 3});
				if(action.data.turn_off){
					//console.log('phuoc2');
					yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 3});
					yield put(actionsUser._updateIsActivePassCode({active: false}));
					yield put(actions._doPassCode({is_active_passcode: false, passcode: 'rextech'}));
				}
			}
			else {
				yield put({ type: actionTypes.CHANGE_LOADING_STATUS_PINCODE, status_pincode: 2});
				if(action.data.turn_off){
					yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 2});
				}
			}
		}
	} catch (e) {
		yield put({ type: actionTypes.CHANGE_LOADING_STATUS_PINCODE, status_pincode: 2});
		if(action.data.turn_off){
			yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 2});
		}
	}

}

const doPassCode = function* doPassCode (action) {
	yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 1});
	try {
		const response = yield call(Axios.post, 'user/setting/passcode', action.data, {loading: false});
		if (typeof response.Error !== 'undefined') {
			yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 2});
		} else {
			if (response.success) {
				yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 3});
				yield put(actionsUser._updateIsActivePassCode({active: action.data.is_active_passcode}));
			}
			else {
				yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 2});
			}
		}
	} catch (e) {
		yield put({ type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE, status_update_pincode: 2});
	}

}
const commonSaga = function* commonSaga () {
  	yield takeEvery(actionTypes.DO_LOGIN, doLogIn);
  	yield takeEvery(actionTypes.DO_LOGOUT, doLogOut);
  	yield takeEvery(actionTypes.DO_RESGITER, doResgiter);
  	yield takeEvery(actionTypes.DO_PASSCODE, doPassCode);
  	yield takeEvery(actionTypes.DO_CHECK_PASS_CODE, doCheckPinCode);
  	yield takeEvery(actionTypes.DO_CHANGE_API_LOADING_STATUS, changeApiLoadingStatus);
  
  	
  	
}

export default commonSaga;
