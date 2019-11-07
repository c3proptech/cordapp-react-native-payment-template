import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StatusBar, TouchableOpacity, TextInput, Image, Clipboard, Share} from 'react-native';
import { Container, View, Text, Icon, ListItem, Left, Body, Right, Button, Footer } from 'native-base';
import I18n from 'react-native-i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Images  from 'payment/configs/images.js';
import AppStyle  from 'payment/configs/styles';
import Theme  from 'payment/configs/theme';
import styles  from './styles';
import { IsIphoneX } from 'payment/configs';
import QRCode from 'react-native-qrcode';
import * as walletActions from 'payment/store/actions/wallet';

class Request extends Component {
 static navigationOptions = ({ navigation, screenProps}) => {
    return {
      title: 'Request ' + navigation.getParam('wallet').token,
      //header: null,
      tabBarVisible: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      'wallet': this.props.navigation.getParam('wallet'),
    };
  }

  componentWillMount() {
    this.props.walletActions._resetWalletDepositAddress();    
    this.props.walletActions._getWalletDepositAddress({'token_symbol': this.state.wallet.token});
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
  }


  toggleMenu() {
    this.props.navigation.toggleDrawer();
  }

  renderHeader(){
    return(
      <View style={AppStyle.headerView}>
        <StatusBar
          backgroundColor={Theme.darkPrimary}
          barStyle="light-content"
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{flex: 1}}>
              <TouchableOpacity onPress={()=> { this.props.navigation.goBack()}}>
                <View style={{alignItems: 'flex-start', paddingLeft: 10}}>
                  <MaterialCommunityIcons active name="arrow-left" style={{ color: "#ffffff", fontSize: 25 }}/>
                </View>
              </TouchableOpacity>>
            </View>
            <View style={{flex: 3}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{marginTop :5, color: '#ffffff', fontSize : 17}}>
                  My Bitcoins
                </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.toggleMenu()} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
                  <View style={{ marginLeft: 20 }}>
                      <Icon type="FontAwesome" name="bars" style={{ color: 'white', fontSize: 22, fontWeight: 'bold', }} />
                  </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }

  writeToClipboard = async () => {
    await Clipboard.setString(this.props.deposit_address.address);
    alert('Copied to Clipboard!');
  };
  shareQRCode(){
    Share.share({
      message: 'Address : ' + this.props.deposit_address.address,
    })
  }
  render() {   
    const { deposit_address } = this.props; 
    return (
      <Container style={{backgroundColor: Theme.darkPrimaryColor}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent : 'center', alignItems : 'center'}}>
          {/*this.renderHeader()*/}
          {/*<View style={{height : 60, justifyContent: 'center', alignItems: 'center'}}>
             <Text style={{color : '#ffffff'}}>1 bits = đ 103.52 USD</Text>
          </View>*/}
          {/*<View style={{height : 100, flexDirection: 'row'}}>
            <TouchableOpacity style={{width : 80, justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons name='swap-vert' style={{fontSize: 40, color : '#ffffff'}}/>
            </TouchableOpacity>
            <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex : 1, flexDirection: 'row', borderBottomColor : '#ffffff', borderBottomWidth : 1}}>
                <View 
                  style={{width : 70,justifyContent: 'center', alignItems: 'flex-start'}}
                >
                  <Text style={{ color: '#ffffff', fontSize : 15}}>đ</Text>
                </View>
                <View style={{flex : 1}}>
                  <TextInput
                    keyboardType='numeric'
                    style={{color: '#ffffff', height : 50, fontSize : 30}}/>
                </View>
                <View 
                  style={{width : 70,justifyContent: 'center', alignItems: 'flex-end'}}
                >
                  <Text style={{ color: '#ffffff', fontSize : 15}}>bits</Text>
                </View>
              </View>
              <View style={{flex : 1, flexDirection: 'row'}}>
                <View 
                  style={{width : 70,justifyContent: 'center', alignItems: 'flex-start'}}
                >
                  <Text style={{ color: '#ffffff', fontSize : 15}}>đ</Text>
                </View>
                <View style={{flex : 1,justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{ color: '#ffffff', fontSize : 15}}>272,813,741</Text>
                </View>
                <View 
                  style={{width : 70,justifyContent: 'center', alignItems: 'flex-end'}}
                >
                  <Text style={{ color: '#ffffff', fontSize : 15}}>VNĐ</Text>
                </View>
              </View>
            </View>
            <View style={{width : 50}}/>
<<<<<<< HEAD
          </View>*/}
          <View style={{width: 210, height: 210, backgroundColor: 'white', padding: 10}}>
            <QRCode
              value={deposit_address.address}
              size={190}
              bgColor='black'
              fgColor='white'
            />
          </View>
          <View style={{height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Text style={{ color: '#ffffff', fontSize : 15, marginBottom : 10}}>Your Receiving Wallet Address</Text>
            <Text style={{ color: '#ffffff', fontSize : 15}}>{deposit_address.address ? deposit_address.address : ''}</Text>
          </View>
        </View>
        <View style={{height : 80, flexDirection: 'row', backgroundColor :Theme.darkPrimaryColor}}>
          <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.darkPrimaryColor, paddingLeft: 10, paddingRight : 5}}>
            <Button iconLeft bordered full rounded
              style={{ borderColor : Theme.colorLoginText, height:50}}
              onPress={this.writeToClipboard}
            >
              <Icon name='copy' style={{color : '#ffffff', fontSize: 30}}/>
              <Text style={{color : '#ffffff'}}>Copy</Text>
            </Button>
          </View>
          <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.darkPrimaryColor, paddingLeft: 5, paddingRight : 10}}>
            <Button iconLeft bordered full rounded
              style={{ borderColor : Theme.colorLoginText, height:50}}
              onPress={() => {this.shareQRCode()}}
            >
              <Icon name='share' style={{ color : '#ffffff', fontSize: 30 }}/>
              <Text style={{color : '#ffffff'}}>Share</Text>
            </Button>
          </View>
        </View>
        {/*<Footer style={{backgroundColor :Theme.colorButton, height : IsIphoneX() ? 30 : 60}}>
            <View style={{flex : 1, flexDirection : 'row'}}>
              <TouchableOpacity style={{flex :1, alignItems: 'center', justifyContent: 'center', borderRightColor: '#ffffff', borderRightWidth: 1}}>
                <Text style={{color : '#ffffff',fontSize : 16}}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex :1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color : '#ffffff',fontSize : 16}}>Share</Text>
              </TouchableOpacity>
            </View>
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
    deposit_address: state.wallet.deposit_address
  };
}

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);
