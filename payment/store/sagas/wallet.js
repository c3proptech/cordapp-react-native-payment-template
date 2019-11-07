import {Alert } from 'react-native';
import { call, put, takeEvery } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
import I18n from 'react-native-i18n';
import { push } from 'react-router-redux';
import { actionTypes } 		from 'payment/store/actions/wallet';
//import * as actionsTrade 	from 'payment/store/actions/trade';
//import * as actionsUser 	from 'payment/store/actions/user';
//import  * as actionsCommon 		from 'payment/store/actions/common';
import * as Axios       from 'payment/services';
//import { NavigationActions } from 'react-navigation';

const doGetWalletsList = function* doGetWalletsList (action) {
	try {
		const response = yield call(Axios.get, 'wallets/data', action.state, {loading: false});
		console.log('doGetWalletsList', response);

		if (typeof response.Error !== 'undefined') {
			console.log('Get node infor error !');
		} else {
			if (response.success) {
				yield put({ type: actionTypes.SET_WALLET_LIST, rows: response.rows, pages: response.pages, sum: response.sum });
			}
			else {
				console.log('Get node infor error !');
			}
		}
	} catch (e) {
		console.log('doGetWalletsList', e);
	}
}

const getWalletDepositAddress = function* getWalletDepositAddress (action) {

	try {
		const response = yield call(Axios.get, 'wallets/address', action.state, {loading: false});
		console.log('getWalletDepositAddress', response);

		if (typeof response.Error !== 'undefined') {
			console.log('Get node infor error !');
		} else {
			if (response.success) {
				yield put({ type: actionTypes.SET_WALLET_DEPOSIT_ADDRESS, data: response.rows });
			}
			else {
				console.log('Get node infor error !');
			}
		}
	} catch (e) {
		console.log('getWalletDepositAddress', e);
	}

}

const getWalletTransactions = function* getWalletTransactions (action) {

	try {
		const response = yield call(Axios.get, 'wallets/transactions', action.state, {loading: false});
		console.log('getWalletTransactions', response);

		if (typeof response.Error !== 'undefined') {
			console.log('Get node infor error !');
		} else {
			if (response.success) {
				yield put({ type: actionTypes.SET_WALLET_TRANSACTIONS, rows: response.rows, pages: response.pages, sum: response.attr });
			}
			else {
				console.log('Get node infor error !');
			}
		}
	} catch (e) {
		console.log('getWalletTransactions', e);
	}
}

const getWalletSelected = function* getWalletSelected (action) {

	try {
		const response = yield call(Axios.get, 'wallets/selected', action.state, {loading: false});
		console.log('getWalletSelected', response);

		if (typeof response.Error !== 'undefined') {
			console.log('Get node infor error !');
		} else {
			if (response.success) {
				yield put({ type: actionTypes.SET_WALLET_SELECTED, data: response.data });
			}
			else {
				console.log('Get node infor error !');
			}
		}
	} catch (e) {
		console.log('getWalletSelected', e);
	}
}

const doSend = function* doSend (action) {
	yield put({ type: actionTypes.SEND_TRANSACTION_STATUS, status: 0, msg:'OK' });
	try {
		const response = yield call(Axios.post, 'wallets/send', action.data);
		if (typeof response.Error !== 'undefined') {
			console.log("Please check you network!");
		} else {
			if (response.success) {
				yield put({ type: actionTypes.SEND_TRANSACTION_STATUS, status: 1, msg: response.msg });
				console.log('Completed successfully.');
				yield put({ type: actionTypes.GET_WALLET_TRANSACTIONS, state: { token_symbol: action.data.send_coin } });
				yield put({ type: actionTypes.GET_WALLET_SELECTED, state: { token_symbol: action.data.send_coin } });
				yield put({ type: actionTypes.GET_WALLET_LIST, state: { token_symbol: action.data.send_coin } });
			}
			else {
				yield put({ type: actionTypes.SEND_TRANSACTION_STATUS, status: 2, msg: response.msg });
				//Alert.alert('RexWallet', response.msg);
			}
		}
	} catch (e) {
	}
};

const walletSaga = function* walletSaga () {
  yield takeEvery(actionTypes.GET_WALLET_LIST, doGetWalletsList);
  yield takeEvery(actionTypes.GET_WALLET_DEPOSIT_ADDRESS, getWalletDepositAddress);
  yield takeEvery(actionTypes.GET_WALLET_TRANSACTIONS, getWalletTransactions);
  yield takeEvery(actionTypes.SEND_TRANSACTION, doSend);
  yield takeEvery(actionTypes.GET_WALLET_SELECTED, getWalletSelected);
  
}
export default walletSaga;