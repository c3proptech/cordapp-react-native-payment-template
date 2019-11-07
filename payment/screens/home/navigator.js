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
  createDrawerNavigator
} from 'react-navigation';
import {
  Icon,
} from 'native-base';
import Theme    from 'payment/configs/theme';
import Images   from 'payment/configs/images';
import Home     from './index';
import Transaction     from './transaction';
import Request     from './request';
import Sidebar     from 'payment/screens/sideBar';
import QRcode     from './qr_code';

const HomeNavigator = createStackNavigator({
  Home: {
    name: 'Home',
    screen: Home,
  },
  Transaction: {
    name: 'Transaction',
    screen: Transaction,
  },
  Request: {
    name: 'Request',
    screen: Request,
  },
  QRcode: {
    name: 'QRcode',
    screen: QRcode,
  },
}, {
  initialRouteName: 'Home',
  //contentComponent: Sidebar,
  //drawerPosition : 'right',
  //mode: 'modal',
  header: true,
  navigationOptions: {
    headerTintColor: Theme.headerTextColor,
    //headerTruncatedBackTitle:'',
    headerStyle: {
      backgroundColor: Theme.headerBackGround,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      },
      elevation: 0,
      borderBottomWidth:0
    },
    headerTitleStyle:{
      color: Theme.headerTextColor
    },
  }
});

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  // if (navigation.state.index == 0) {
  //   tabBarVisible = false;
  // }
  return {
    tabBarVisible,
  };
};

export default HomeNavigator;
