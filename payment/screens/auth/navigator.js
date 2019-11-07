import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  TouchableOpacity,
  NativeModules,
  BackHandler,
  NetInfo,
  Image,
  StatusBar
} from 'react-native';
import {
  NavigationActions,
  StackNavigator,
  TabNavigator,
  createStackNavigator
} from 'react-navigation';

import Theme  from '../../configs/theme';
import Login    from './login.js';
import Register from './register.js';

const AuthNavigator = createStackNavigator({
  Login: {
    name: 'Login',
    path :'/login',
    description: 'Login Page',
    screen: Login,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Login'
    }),
  },
  Register: {
    name: 'Register',
    path :'/register',
    description: 'Register',
    screen: Register,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Register'
    }),
  },
  SettingPin: {
    name: 'Setting',
    screen: Setting,
  },
}, {
  initialRouteName: 'Login',
  mode: 'modal',
  navigationOptions: {
    headerTintColor: Theme.headerTextColor,
    headerTruncatedBackTitle:'',
    headerStyle: {
      backgroundColor: Theme.headerBackGround,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      },
      elevation: 0,
    },
    headerTitleStyle:{
      color: Theme.headerTextColor
    },
  }
});

export default AuthNavigator;