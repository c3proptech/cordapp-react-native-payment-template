import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity, RefreshControl, Dimensions} from 'react-native';
import { Container, Content, View, Item, Input, Button, Text, CheckBox, Icon , Thumbnail, ListItem, Left, Body, Right, Footer ,FooterTab, Separator, Switch} from 'native-base';
import Images  from 'payment/configs/images.js';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import PinView from 'react-native-pin-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IsIphoneX } from 'payment/configs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_doLogOut, _doPassCode, _doCheckPinCode, _changeLoadingStatusUpdatePinCode} from 'payment/store/actions/common';
//import {_updateIsActivePassCode} from 'payment/store/actions/user';
import { JSEncrypt } from 'jsencrypt';
import Define from 'payment/configs/define';
let encrypt = new JSEncrypt();
encrypt.setPublicKey(Define.publicKey);
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
class Account extends Component {
  static navigationOptions = ({ navigation, screenProps}) => {
    return {
      title: 'My Account',
      //header: null,
      //tabBarVisible: false
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      position : 0,
      interval: null,
      refreshing: false,
      loading: false,
      showPopUpPinCode : false,
      pinCode : '',
      pinCode1 : '',
      showPopUpPassword : false
    };
  }
  
  onPressLogout(){
    this.props._doLogOut();
  }
  changePincode(){
    this.setState({showPopUpPinCode : !this.state.showPopUpPinCode});
  }
  onComplete(val, clear){
    if(this.state.pinCode == ''){
      // turn off
      if(this.props.user.IsActivePassCode){
        var data ={
            passcode : encrypt.encrypt(val),
            is_active_passcode : false,
            turn_off : true
        }
        // check pincode
        this.props._doCheckPinCode(data);
      }else{
        //  turn on comfirm pincode
        this.setState({pinCode : val});
        let that =this;
        setTimeout(function() {
          clear()
        }, 500);
      }
    }else{
      //  turn on comfirm pincode1
      if(this.state.pinCode == val){
        var data ={
            passcode : encrypt.encrypt(val),
            is_active_passcode : true
        }
        this.props._doPassCode(data);
      }else{ 
        this.setState({pinCode : '', pinCode1 : '', showPopUpPinCode : false});
        setTimeout(function() {
          Alert.alert('Pay ment', 'Wrong confirm Pin code');
        }, 500);
      } 
    }
  }
  
  componentDidMount(){
    //this.setState({statusPincode : })
  }
  componentWillReceiveProps(newProps) {
    if(newProps.status_update_pincode === 3){
      this.setState({pinCode : '', pinCode1 : '', showPopUpPinCode : false});
      this.props._changeLoadingStatusUpdatePinCode(0);
    }      
    if(newProps.status_update_pincode === 2){
      this.setState({pinCode : '', pinCode1 : '', showPopUpPinCode : false});
      this.props._changeLoadingStatusUpdatePinCode(0);
      setTimeout(function() {
        Alert.alert('Pay ment', 'Wrong Pin code');
      }, 300);
    }
    if(newProps.user.IsActivePassCode != this.props.user.IsActivePassCode){
        //this.setState({showPopUpPinCode : newProps.user.IsActivePassCode});
    }
  }
  renderHeader(){
    return(
      <View style={{height: 80,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom : 0
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={()=> { this.setState({showQRCode : false})}}>
            <View style={{alignItems: 'flex-start', paddingLeft: 10}}>
              <Icon name='close' style={{color :'#ffffff', fontSize :40}}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          <TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={{marginTop :10, color: '#ffffff', fontSize : 17}}>
                Send
              </Text>
              <Text style={{marginTop :10, color: '#ffffff', fontSize : 12}}>
                0.00000 BAT Available
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={()=> { }}>
            <View style={{alignItems: 'flex-end', paddingRight: 10}}>
              {/*<MaterialCommunityIcons active name="star" style={{ color: "#ffffff", fontSize: 25 }}/>*/}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  renderShowPinCode(){
    return(  
      <Modal
        visible={this.state.showPopUpPinCode}
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => {}}
        >
        <View style={{backgroundColor : Theme.darkPrimaryColor, flex: 1}}>
          <View style={{ flex: 1, justifyContent : 'center', zIndex : 20}}>
            <View style={{height : 80, alignItems : 'center'}}>
              <Text style={{color : '#ffffff', fontSize : 30}}>{this.state.pinCode ? "Re-PinCode" : 'PinCode'}</Text>
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

  renderChangePassWord(){
    return(
      <Modal
        animationType={"fade"}
        transparent={true}
        isVisible={this.state.showPopUpPassword}
        onRequestClose={() => {}}
      >
        <View style={styles.modal}>
          <View style={styles.formPassWord}>
              <View style={{height : 60 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                <View style={{width : 150, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text>Current password</Text>
                </View>
                <View style={{flex : 3}}>
                  <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      placeholder=''
                      secureTextEntry={true}
                      placeholderTextColor={'#999'}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password, userValid: validate('password', this.state.password) ? false : true })}
                    />
                </View>
              </View>
              <View style={{height : 60 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                <View style={{width : 150, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text>New password</Text>
                </View>
                <View style={{flex : 3}}>
                  <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      placeholder=''
                      secureTextEntry={true}
                      placeholderTextColor={'#999'}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password, userValid: validate('password', this.state.password) ? false : true })}
                    />
                </View>
              </View>
              <View style={{height : 60 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                <View style={{width : 150, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text >Confirm password</Text>
                </View>
                <View style={{flex : 3}}>
                  <Input
                    style={{paddingBottom: 0, marginBottom: 0}}
                    secureTextEntry={true}
                    placeholder=''
                    secureTextEntry={true}
                    placeholderTextColor={'#999'}
                    value={this.state.password1}
                    onChangeText={password1 => this.setState({ password })}
                  />
                </View>
              </View>
              <View style={{height : 50, marginTop: 20}}>
                <View style={{flex: 1, flexDirection : 'row'}}>
                  <View style={{flex: 1}}>
                    <Button light bordered rounded
                       style={{ borderColor : Theme.colorLoginText, height:50, backgroundColor : '#999' }}
                       onPress={() => {this.setState({showPopUpPassword : false})}}
                    >
                      <Text style={{fontSize: 25 ,color : Theme.colorLoginInput}}>Cancel</Text>
                    </Button>
                  </View>
                  <View style={{flex: 1}}>
                    <Button block bordered rounded
                       style={{ borderColor : Theme.colorLoginText, height:50, backgroundColor : Theme.backGroudButton }}
                       onPress={() => {this.setState({showPopUpPassword : false})}}
                    >
                      {
                        this.props.loading ? <Spinner color={Theme.colorLoginInput}/> :
                        <Text style={{fontSize: 25 ,color : Theme.colorLoginInput}}>Confirm</Text>
                      }
                      
                    </Button>
                  </View>
                </View>
              </View>
          </View>
        </View>
      </Modal>
    )
  }
  render() {
    return (
      <Container style={{backgroundColor: "red"}}>
        <Content style={{backgroundColor : '#ffffff'}}>
          {
            this.state.showPopUpPinCode ? this.renderShowPinCode() : null
          }
          {
            this.state.showPopUpPassword ? this.renderChangePassWord() : null
          }
          <Separator bordered style={styles.separator}>
            <Text style={styles.separatorText}>Pin code</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Pincode</Text>
            </Left>
            <Right>
              <Switch 
                onValueChange={() => {this.changePincode()}}
                value={this.props.user.IsActivePassCode} 
              /> 
            </Right>
          </ListItem>
          <Separator bordered style={styles.separator}>
            <Text style={styles.separatorText}>Account</Text>
          </Separator>
          <ListItem onPress={() => {this.setState({showPopUpPassword : true})}}>
            <Left>
              <Text>Change Password</Text>
            </Left>
            {/*<Right>
              <Switch 
                value={false} 
              /> 
            </Right>*/}
          </ListItem>
          <ListItem onPress={() => {this.onPressLogout()}}>
            <Left>
              <Text>Log out</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
        </Content>
        {/*<Footer style={{backgroundColor :Theme.colorButton, height : IsIphoneX() ? 30 : 60}} onPress={() => this.onPressLogout()}>
            <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 100, right: 100}} onPress={() => this.onPressLogout()}>
              <View style={{flex :1, flexDirection : 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color : '#ffffff',fontSize : 16}}>Log out</Text>
              </View>
            </TouchableOpacity>
        </Footer>*/}
      </Container>
    );
  }
}


/****************************************
 * Redux
 ****************************************/
function mapStateToProps(state) {
  
  return {
    loading: state.common.loading,
    language: state.common.language,
    session: state.user.session,
    user :  state.user.data,
    status_update_pincode : state.common.status_update_pincode
  };
}

function mapDispatchToProps(dispatch) {
    return {
      _doLogOut: () => dispatch(_doLogOut()),
      _doPassCode: (data) => dispatch(_doPassCode(data)),
      _doCheckPinCode: (data) => dispatch(_doCheckPinCode(data)),
      _changeLoadingStatusUpdatePinCode: (data) => dispatch(_changeLoadingStatusUpdatePinCode(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
