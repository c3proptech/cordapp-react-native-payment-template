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
import {
  Icon,
} from 'native-base';
import Theme    from 'payment/configs/theme';
import Images   from 'payment/configs/images';

import Account     from './index';

const AccountNavigator = createStackNavigator({
  Account: {
    name: 'Account',
    description: 'Account Page',
    screen: Account,
  }
}, {
  initialRouteName: 'Account',
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

export default AccountNavigator;
