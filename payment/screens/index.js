import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AppState,
  YellowBox,
  Modal,
  ImageBackground,
  NetInfo
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  SafeAreaView
} from 'react-navigation';

import {
  Container,
  StyleProvider
} from 'native-base';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Theme  from 'payment/configs/theme';
import Images  from 'payment/configs/images.js';
import {AuthNavigator, MainNavigator} from './navigator';
import {_doLogOut, _doCheckPinCode, _changeLoadingStatusPinCode} from 'payment/store/actions/common';
import PinView from 'react-native-pin-view';
import * as Progress from 'react-native-progress';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//import Pin from 'payment/screens/pin';
import { IsIphoneX } from 'payment/configs';
import { JSEncrypt } from 'jsencrypt';
import Define from 'payment/configs/define';
let encrypt = new JSEncrypt();
encrypt.setPublicKey(Define.publicKey);
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const StatusBarHeightIos = IsIphoneX() ? 32 : 20;
const StatusBarHeight = Platform.OS === 'ios' ? StatusBarHeightIos : 0;

class RootContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
       auto_login : false,
       appState: AppState.currentState,
       show_pin_code : false,
       is_login : false,
       wrong_pincode : false,
       connectionInfo : false,
       loading: true
    }
    //NavigationActions.setNavigator(props.navigator);
  }
  componentDidUpdate() {

      
      // let cookie = prevProps.session.token.cookie;
      // let newCookie = this.props.session.token.cookie;
      // let lang = prevProps.lang;
      // let newLang = this.props.lang;

      // if(cookie == null && cookie != newCookie) {
      //     this.appNavigation._navigation.navigate('MainApp');
      // }

      // if(cookie && cookie != newCookie) {
      //     this.appNavigation._navigation.navigate('AuthApp');
      // }

      // if(lang != newLang) {
      //     this.appNavigation._navigation.navigate('MainApp');
      //     // I18n.locale = newLang;
      // }
      I18n.locale = this.props.language;
  }

  componentWillReceiveProps(newProps) {
    if(!this.state.is_login && newProps.user.IsActivePassCode != this.props.user.IsActivePassCode){
      this.setState({is_login : true, show_pin_code : newProps.user.IsActivePassCode})
    }
    if(newProps.status_pincode == 3) {
      console.log('componentWillReceiveProps', newProps.status_pincode);
      this.setState({show_pin_code : false, wrong_pincode: false});
      this.props._changeLoadingStatusPinCode(0);
    }
    if(newProps.status_pincode == 2){
      this.setState({wrong_pincode : true});
      this.props._changeLoadingStatusPinCode(0);
    }
    
  }

  componentWillMount() {

    if(this.props.user.IsActivePassCode) {
      //this.setState({show_pin_code : true})
    }
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('componentWillMount Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      if (connectionInfo.type === 'none') {
        this.setState({ connectionInfo: false, show_pin_code: false});
      } else {
        this.setState({ connectionInfo: true});
      }
    });
  }
  
  componentDidMount() {
    setTimeout(function () {
      this.setState({ loading: false });
    }.bind(this), 1000);

    AppState.addEventListener('change', this._handleAppStateChange);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ connectionInfo: isConnected }); }
    );
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  checkPinCodeOpen() {
    if (this.state.connectionInfo) {
      if (this.props.user.IsActivePassCode && !this.state.show_pin_code){
        this.setState({show_pin_code : true});
      }
    } else {
      this.setState({show_pin_code : false});
    }
    console.log('checkPinCodeOpen');
  }
  
  handleConnectionChange = (isConnected) => {
    this.setState({ connectionInfo: isConnected });
    if (!isConnected) this.setState({show_pin_code : false});
    console.log(isConnected);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log('App has come change state!');
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        if (connectionInfo.type === 'none') {
          this.setState({ connectionInfo: false, show_pin_code: false });
        } else {
          this.setState({ connectionInfo: true });
        }
      });
      /*if(!this.props.auto_login){
        this.props._doLogOut();
      }*/
      this.checkPinCodeOpen();
    }
    this.setState({appState: nextAppState});
  }

  onComplete(val, clear){
    this.setState({wrong_pincode : false});
    this.props._doCheckPinCode({passcode : encrypt.encrypt(val)});
    setTimeout(function() {
      clear();
    }, 200);
    //this.setState({show_pin_code : false});  
  }

  renderLoading() {
    return(  
      <Modal
        visible={true}
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => {}}
        >
        <View style={{backgroundColor : Theme.darkPrimaryColor, flex: 1, justifyContent :'center', alignItems : 'center'}}>
          <View style={{ 
            //backgroundColor : '#ffffff',
            borderRadius : 5,
            paddingLeft : 15,
            paddingRight: 15,
            paddingBottom : 15,
            width: deviceWidth - 50,
          }}>
            <View style={{height : 150, justifyContent : 'center', alignItems : 'center'}}>
              {/*<Text style={{fontSize : 40, color: '#ffffff'}}>Wallet</Text>*/}
              <Progress.Bar progress={0.3} indeterminate={true} width={200} color={'#ffffff'} borderColor={'#ffffff'} />
              {/*<Text style={{fontSize : 20, color: '#ffffff'}}>Loading ...</Text>*/}  
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderShowPinCode(){
    return(  
      <Modal
        visible={this.state.show_pin_code}
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => {}}
        >
        {/*<ImageBackground
          source={Images.mainBackground1}
          style={{
            flex: 1,
            width: deviceWidth,
            height: deviceHeight,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        <View style={{ flex: 1, justifyContent : 'center', zIndex : 20}}>
          <View style={{height : 80, alignItems : 'center'}}>
            <Text style={{color : Theme.darkPrimaryColor, fontSize : 30}}>{this.state.wrong_pincode ? "Wrong PinCode" : ''}</Text>
          </View> 
          <PinView
          onComplete={(val, clear) =>{this.onComplete(val, clear)}}
          pinLength={5}
          inputActiveBgColor={Theme.darkPrimaryColor}
          />
        </View>
        </ImageBackground>*/}
        <View style={{backgroundColor : Theme.darkPrimaryColor, flex: 1}}>
          <View style={{ flex: 1, justifyContent : 'center', zIndex : 20}}>
            <View style={{height : 80, alignItems : 'center'}}>
              <Text style={{color : '#ffffff', fontSize : 30}}>{this.state.wrong_pincode ? "Wrong PinCode" : 'PinCode'}</Text>
            </View> 
            <PinView
            onComplete={(val, clear) =>{this.onComplete(val, clear)}}
            pinLength={5}
            inputActiveBgColor="#ffffff"
            />
          </View>
        </View>
      </Modal>
    )
  }

  renderDisconnect(){
    return(  
      <Modal
        visible={true}
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => {}}
        >
        <View style={{backgroundColor : Theme.darkPrimaryColor, flex: 1, justifyContent :'center', alignItems : 'center'}}>
          <View style={{ 
            //backgroundColor : '#ffffff',
            borderRadius : 5,
            paddingLeft : 15,
            paddingRight: 15,
            paddingBottom : 15,
            width: deviceWidth - 50,
          }}>
            <View style={{height : 150, justifyContent : 'center', alignItems : 'center'}}>
            <Text style={{fontSize : 40, color: '#ffffff'}}>Wallet</Text>
             <Text style={{fontSize : 20, color: '#ffffff'}}>Internet Connection Required</Text>  
             </View>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const { session, language, loading, auto_login, isLogin} = this.props;
    console.log('render',this.state.show_pin_code);
    if (this.state.loading) {
      return <Container><StatusBar barStyle="light-content" backgroundColor={Theme.darkPrimaryColor}/>{ this.renderLoading() }</Container>;
    } else {
      return (
        <Container>
          <StatusBar barStyle="light-content" backgroundColor={Theme.darkPrimaryColor}/>
          { Platform.OS === 'ios' ? <View style={{height : StatusBarHeight, backgroundColor : Theme.darkPrimaryColor}}></View> : null } 
          {
            (!this.state.connectionInfo && !this.state.show_pin_code) ? 
              this.renderDisconnect() :
                (session && session.token) ?
                  ((this.state.show_pin_code && this.state.connectionInfo) ? this.renderShowPinCode() :
                    <SafeAreaView style={{flex : 1}} forceInset={{bottom: 'none' }}>
                      <MainNavigator/>
                    </SafeAreaView>) : 
                      <AuthNavigator />
          }
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auto_login: state.basic.auto_login,
    isLogin: state.common.isLogin,
    session: state.common.session,
    loading: state.common.loading,
    language: state.common.language,
    user :  state.user.data,
    status_pincode : state.common.status_pincode
  };
};

const mapStateToDispatch = dispatch => ({
  _doLogOut: () => dispatch(_doLogOut()),
  _doCheckPinCode: (data) => dispatch(_doCheckPinCode(data)),
  _changeLoadingStatusPinCode: (data) => dispatch(_changeLoadingStatusPinCode(data)),
})

export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)