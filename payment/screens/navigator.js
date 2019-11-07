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
  createStackNavigator,
  createTabNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme  from 'payment/configs/theme';
import Login           from './auth/login.js';
import Register from './auth/register.js';
import Forgot from './auth/forgot.js';
import HomeNavigator    from './home/navigator.js';
//import TradeNavigator    from './trade/navigator.js';
import MarketsNavigator    from './markets/navigator.js';
import AccountNavigator    from './account/navigator.js';
//import Pin     from 'payment/screens/pin';
export const AuthNavigator = createStackNavigator({
  Login: {
    name: 'Login',
    screen: Login,
    path: '/login',
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
  Forgot: {
    name: 'Forgot',
    path :'/forgot',
    description: 'Forgot',
    screen: Forgot,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Forgot'
    }),
  }
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
export const MainNavigator = createBottomTabNavigator({
  HomeNavigator: {
    screen: HomeNavigator,
    path: '/registration',
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Wallet',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          type="SimpleLineIcons"
          name={focused ? 'wallet' : 'wallet'}
          size={26}
          style={{ color: tintColor, marginTop: 0 }}
        />
      ),
    }),
  },
  AccountNavigator: {
    screen: AccountNavigator,
    path: '/account',
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons
          name="account-outline"
          style={{fontSize: 26, color: tintColor, marginTop: 0 }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'HomeNavigator',
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 12,
      padding: 0,
      margin: 1,
    },
    iconStyle: {
      marginTop: Platform.OS === 'ios' ? 0 : -7
    },
    activeTintColor: Theme.footerTabsColorActive,
    inactiveTintColor: Theme.footerTabsColorInActive,
    style: {
      backgroundColor: Theme.darkPrimaryColor,//Theme.footerBackGround
      borderTopWidth:0,
      borderTopColor: Theme.footerBorderColor,
      
    },
    indicatorStyle: {
        backgroundColor: '#75d2d7',
    },
  },
  // tabBarOnPress: (route, jumpToIndex) => {
  //   console.log('11111111111111',route);
  //   console.log('11111111111111',jumpToIndex);
  //   jumpToIndex(1);
  //   }
});
