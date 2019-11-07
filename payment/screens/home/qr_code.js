import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StatusBar, TouchableOpacity, Modal, Dimensions, Image, Alert} from 'react-native';
import { Container, View, Text, Icon, ListItem, Left, Body, Right, Button } from 'native-base';
import Images  from 'payment/configs/images.js';
import AppStyle  from 'payment/configs/styles';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import QRScannerView from 'payment/ac-qrcode/QRScannerView';
import Keyboard from 'react-native-keyboard';

import * as walletActions from 'payment/store/actions/wallet';

const deviceWidth = Dimensions.get('window').width;
let model = {
    
    _keys: [],

    _listeners: [],

    addKey(key) {
        this._keys.push(key);
        this._notify();
    },

    delKey() {
        this._keys.pop();
        this._notify();
    },

    clearAll() {
        this._keys = [];
        this._notify();
    },

    getKeys() {
        return this._keys;
    },

    onChange(listener) {
        if (typeof listener === 'function') {
            this._listeners.push(listener);
        }
    },

    _notify() {
        this._listeners.forEach((listner) => {
            listner(this);
        });
    }
};

class QRcode extends Component {
 static navigationOptions = ({ navigation, screenProps}) => {
    return {
      title: 'Scan to Send ' + navigation.getParam('wallet', 'Request').token,
      //header: null,
      //tabBarVisible: false
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      wallet: this.props.navigation.getParam('wallet'),
      showQRCode : false,
      dataQRCode : '',
      number : '',
      send_coin: '',
      send_address: '32wPgGymwYUoHe5mcnuUwB1sgq7Y9RVELB',
      send_amount: ''
    };
    
  }

  componentWillReceiveProps(newProps) {

    if(newProps.send_status.status === 1) {
      this.props.navigation.navigate({ routeName: 'Transaction', params: {wallet: this.state.wallet}});
      this.props.walletActions.changeSendStatus(0, 'OK');
    }

    if(newProps.send_status.status === 2) {
      Alert.alert('RexWallet', newProps.send_status.msg);
      this.props.walletActions.changeSendStatus(0, 'OK');
    }

  }

  toggleMenu() {
    this.props.navigation.toggleDrawer();
  }

  _gotoTranSation(){
    this.props.navigation.navigate('Transaction');
  }
  _renderTitleBar(){
      return(
          <Text
            style={{color:'white',textAlignVertical:'center', textAlign:'center',fontSize:15,padding:12}}
          >Scan to Send</Text>
      );
  }

  _renderMenu() {
    return (
      <Text
          style={{color:'white',textAlignVertical:'center', textAlign:'center',fontSize:15,padding:12}}
      >Make your send transaction</Text>
    )
  }

  onPressSend() {
    if (this.state.wallet.token && this.state.send_address && this.state.number) {
      this.setState({ loading: true });
      var data ={
        send_coin: this.state.wallet.token,
        send_address: this.state.send_address,
        send_amount   : this.state.number
      }
      this.props.walletActions._doSend(data);
    }
    else {
      this.setState({loading: false});
      Alert.alert('RexWallet.', 'Please check data.');
      return false;
    }
  }

  barcodeReceived(e) {
    if(e.data){
      this.setState({
        showQRCode : true,
        dataQRCode : e.data,
        send_address: e.data
      })
    }
      //Toast.show('Type: ' + e.type + '\nData: ' + e.data);
      console.log(e)
  }

  _handleClear() {
    this.setState({number : ''});
      model.clearAll();
  }

  _handleDelete(key) {
    let number = this.state.number.toString();
    let slice_number = number.slice(0,-1);
    this.setState({number : slice_number});
      model.delKey();
  }

  _handleKeyPress(key) {
    //let number = this.state.number.toString();
    //let convert_number = number+key
    this.setState({number : this.state.number+key});
      model.addKey(key);
  }

  _goHome(){

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
                {this.state.wallet.total} {this.state.wallet.token} Available
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

  renderQRCode(){
    return(
      <Modal
            animationType={"fade"}
            isVisible={true}
            onRequestClose={() => {}}
          >
              <View style={styles.modal}>
                  {this.renderHeader()}
                  <View style={{ flex : 1,width: deviceWidth, backgroundColor: Theme.darkPrimaryColor}}>
                    <View style={{height: 200,marginTop :20,  justifyContent: 'center', alignItems:'center'}}>
                        <Text style={{color: '#ffffff', fontSize : 40, marginBottom : 20}}>{this.state.number ? this.state.number : '0.00'} {this.state.wallet.token}</Text>
                        {/*<Text style={{color: '#ffffff', fontSize : 25}}>0 {this.state.wallet.token}</Text>*/}
                    </View>
                    <View style={{height: 80, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{ color: '#ffffff', fontSize : 15, marginBottom : 10}}>Your Receiving Wallet Address</Text>
                      <Text style={{ color: '#ffffff', fontSize : 15}}>{this.state.dataQRCode}</Text>
                    </View>
                  </View>
                  <View>
                    <Keyboard 
                        keyboardType="decimal-pad"
                        onClear={this._handleClear.bind(this)}
                        onDelete={this._handleDelete.bind(this)}
                        onKeyPress={this._handleKeyPress.bind(this)} 
                    />
                    <TouchableOpacity style={{height : 60, width : deviceWidth,backgroundColor : Theme.darkPrimaryColor, justifyContent : 'center', alignItems : 'center'}} onPress={() => this.onPressSend()}>
                      <Text style={{color: '#ffffff', fontSize : 25}}>Send</Text>
                    </TouchableOpacity>
                  </View>
              </View>

          </Modal>
    )
  }

  render() {
      return (
        <View style={{flex: 1}}>
          {
            this.state.showQRCode ? this.renderQRCode() : 
            <QRScannerView
              scanBarColor="#ffffff"
              cornerColor={Theme.darkPrimaryColor}
              onScanResultReceived={this.barcodeReceived.bind(this)}
              renderTopBarView={() => this._renderTitleBar()}
              renderBottomMenuView={() => this._renderMenu()}
            />
          }
        </View>
      )
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
    send_status: state.wallet.send_status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRcode);
