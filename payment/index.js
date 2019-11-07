import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import I18n from 'react-native-i18n';
import AppRootContainer from './screens/index.js';
import { store, configureStore } from './store';
import { IsIphoneX } from 'payment/configs';
const StatusBarHeightIos = IsIphoneX ? 32 : 20;
const StatusBarHeight = Platform.OS === 'ios' ? StatusBarHeightIos : 0;
console.disableYellowBox = true;

// Disable log if there is production mode
if((process.env.NODE_ENV || '').toLowerCase() === 'production'){
	console.log = function () {};
	console.info = function () {};
	console.warn = function () {};
	console.error = function () {}
	console.debug = function () {}
}

export default class App extends Component {
	constructor(props) {
    	super(props);
	    this.state = {
	      isLoading: true,
	      store: configureStore(() => this.setState({ isLoading: false })),
	    };
	    I18n.fallbacks = true
  		I18n.translations = {
  			en: require('payment/i18n/en.json'),
  			ko: require('payment/i18n/ko.json'),
  			vi: require('payment/i18n/vi.json')
  		}
  	}

  	componentDidMount () {
  	}
  	
	render () {
		
		if (this.state.isLoading) return null;
		return (
			<Provider store={this.state.store}>
	  		<AppRootContainer />
	  	</Provider>
		)
	}
}