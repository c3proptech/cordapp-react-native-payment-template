import {
	AlertIOS,
	Alert,
	Platform
} from 'react-native';
import { NavigationActions} from 'react-navigation';
import axios from 'axios';
import Define from 'payment/configs/define';
import { store } from 'payment/store';
import qs from 'qs';

//import api from './'
var instance = axios.create();
instance.defaults.baseURL = Define.domainApi;
instance.interceptors.request.use(function (config) {
	config.headers['Is-mobile'] = true;
	config.headers['APP_TYPE'] = 'app';
	config.headers['App-Type'] = 'app';
	config.headers['app-type'] = 'app';
	config.headers['DEVICE_TYPE'] = Platform.OS;
	config.headers['device-type'] = Platform.OS;
	config.headers['Device-Type'] = Platform.OS;
	config.headers['DEVICE'] ='phone';
	config.headers['device'] ='phone';
	//config.headers['X-Requested-With'] = 'XMLHttpRequest';
	if(config.method === 'post'){
		config.data = qs.stringify(config.data);
	}
	if (config.headers['loading']){
		store.dispatch({ type: 'CHANGE_LOADING_STATUS', loading: true });
	}
	
	console.log('instance.interceptors.request', config.headers);
	return config;
}, function (error) {
	console.log('instance.interceptors.requestError', config);
	store.dispatch({ type: 'CHANGE_LOADING_STATUS', loading: false });
	return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
	store.dispatch({ type: 'CHANGE_LOADING_STATUS', loading: false });
	console.log('instance.interceptors.response', response);
	return response;
}, function (error) {
	store.dispatch({ type: 'CHANGE_LOADING_STATUS', loading: false });
	console.log('instance.interceptors.responseError', error);
	return Promise.reject(error);
});

const checkRequest = async () => {
	if (typeof instance.defaults.baseURL == 'undefined' || typeof instance.defaults.headers['Token'] == 'undefined') {
		const session = await store.getState().user.session;
		if (typeof session != 'undefined' && session.token) {
			if (typeof instance.defaults.headers['Token'] == 'undefined') {
				//
			}
		}
		return true;
	} else {
		return false;
	}
}

export const configAxios = async (baseURL) => {
	instance.defaults.baseURL = baseURL;
}

export const configTokenAxios = async (key) => {
	//instance.defaults.headers['Token'] = key;
}

export const clearCookie = async () => {
	//console.log(instance.defaults.headers);
	delete instance.defaults.headers.common['Cookie'];
	delete instance.defaults.headers['Token'];
	//console.log(instance.defaults.headers);
}

export const get = async (URL, params = {}, headers = {loading: true}) => {
	await checkRequest();
	const session = await store.getState().user.session;

	if (typeof session !== 'undefined' && session.token) {
		URL = URL + '?Token=' + session.token;
	}
	return await instance.get(URL, {params: params, headers: headers})
	.then(function(response) {
		//console.log(response.data);
		//console.log(response.status);
		//console.log(response.statusText);
		//console.log(response.headers);
		//console.log(response.config);
		return response.data;
	})
	.catch(function (error) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error.config);
		return {'Error': error};
	});
}

export const post = async (URL, data = {}, configs = {}) => {
	//await checkRequest();
	const session = await store.getState().user.session;
	if (typeof session !== 'undefined' && session.token) {
		URL = URL + '?Token=' + session.token;
	}
	console.log('response.data',URL);
	console.log(instance.defaults);
	return await instance.post(URL, data, configs)
	.then(function(response) {
		//console.log(response.data);
		//console.log(response.status);
		//console.log(response.statusText);
		//console.log(response.headers);
		//console.log(response.config);
		return response.data;
	})
	.catch(function (error) {
		var msg = '';
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (typeof error.response.data.msg != 'undefined') {
				msg = error.response.data.msg;
			}
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('1111111Error', error.message);
		}
		console.log(error);
		return {'222222Error': error, msg: msg};
	});
}
