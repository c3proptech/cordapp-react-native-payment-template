import {Alert } from 'react-native';
import { call, put, takeEvery } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import I18n from 'react-native-i18n';
import { push } from 'react-router-redux';
import { js_yyyy_mm_dd_hh_mm_ss } from 'payment/configs';
import { actionTypes } 		from 'payment/store/actions/trade';
import * as actionsTrade 	from 'payment/store/actions/trade';
import * as actionsUser 	from 'payment/store/actions/user';
import  * as actionsCommon 		from 'payment/store/actions/common';
import * as Axios       from 'payment/services';
//import { NavigationActions } from 'react-navigation';

const getTimeServer = function* getTimeServer () {
	let time = js_yyyy_mm_dd_hh_mm_ss();
	try {
		const response = yield call(Axios.get, 'order/server_time', {}, {loading: false});
		if (typeof response.Error != 'undefined') {
			yield put(actionsTrade._updateTimeServer(time));
		}else{
			if(response.success){
				yield put(actionsTrade._updateTimeServer(response.data));
			}else{
				yield put(actionsTrade._updateTimeServer(time));
			}	
		}			
	} catch (e) {
		yield put(actionsTrade._updateTimeServer(time));
	}
}

const doTrade = function* doTrade (params) {
	try {
		const response = yield call(Axios.post, 'order', params.data, params.isLoading);
		if (typeof response.Error != 'undefined') {
			yield put({ type: actionTypes.STATUS_TRANSACTION, data : {status: true, msg : 'Error systems'}});
		}else{
			console.log('STATUS_TRANSACTION', response);
			if(response.success){
				yield put({ type: actionTypes.STATUS_TRANSACTION, data :{status: true, msg :response.msg}});
			}else{
				yield put({ type: actionTypes.STATUS_TRANSACTION, data :{status: true, msg :response.msg}});
			}
			
		}			
	} catch (e) {
		yield put({ type: actionTypes.STATUS_TRANSACTION, data : {status: true, msg : 'Error systems'}});
	}
	
}

async function getBrokerData (data, loading = true) {
  return await Axios.get('order/result', data, {loading: false});
  
};

const brokerFetchData = function* brokerFetchData (data) {
	try {
		const response = yield call(getBrokerData, data.data , data.isLoading);
		if (typeof response.Error != 'undefined') {
		
		}else{
			if(response.success){
				yield put(actionsTrade._updateBrokerData(response));
				// get time server
				// const updateTimeServer = yield call(Axios.get, 'order/server_time', {}, {loading: false});
				// yield put(actionsTrade._updateTimeServer(updateTimeServer.data));
				// get update icon
				const updateUser = yield call(Axios.get, 'user/user_board', {}, {loading: false});
				yield put(actionsUser._updateUserData(updateUser.rows));
			}else{
				
			}
		}			
	} catch (e) {
		
	}	
}

const tradeSaga = function* tradeSaga () {
  	yield takeEvery(actionTypes.DO_TRADE, doTrade);
  	yield takeEvery(actionTypes.GET_TIME_SERVER, getTimeServer);
  	yield takeEvery(actionTypes.BROKER_FETCH_DATA, brokerFetchData);
  	
}
export default tradeSaga;