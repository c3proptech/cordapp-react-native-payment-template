import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity, RefreshControl, WebView, FlatList, Platform, Keyboard, KeyboardAvoidingView, ScrollView, TextInput} from 'react-native';
import { Container, Content, View, Item, Input, Button, Text, CheckBox, Icon , Thumbnail, ListItem, Left, Body, Right } from 'native-base';
import Images  from 'payment/configs/images.js';
import {NavigationEvents, SafeAreaView } from 'react-navigation';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimerCountdown from 'react-native-timer-countdown';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';
import Toast from 'react-native-root-toast';
import {_doTrade, _brokerFetchData, _getTimeServer, _clearStatusTransation} from 'payment/store/actions/trade';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
function playSound(testInfo, component) {
  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      return;
    }
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      sound.release();
    });
  };
  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound));
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
  }
}
const resetTo = (payload = {}) => {
  
};

class Trade extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false
  });
  constructor(props) {
    super(props);
    this.state = {
      position : 0,
      interval: null,
      refreshing: false,
      loading: false,
      time : 30,
      start : 0,
      is_mute : false,
      is_transaction : false,
      loopingSound: undefined,
      tests: {},
      testInfo : {
        title: 'heartbeat',
        isRequire: true,
        url: require('./heartbeat.mp3'),
        onPrepared: (sound, component) => {
          sound.setNumberOfLoops(-1);
          component.setState({loopingSound: sound});
        },
      },
      amount : 0,
      broker : 'CRYPTO',
      symbol : 'CRYPTO:BTC:USDT',
      symbol_lower : 'crypto_btc_usdt',
      hidden_keyboard : false,
      showToast : false,
      showToastStatus : ''
    }; 
  }
  _getFetchData(data){
    this.props._getTimeServer();
    this.props._brokerFetchData(data, true);
  }
  componentWillMount() {
    // get time server
    let data ={
      broker : this.state.broker,
      account : 'live',
      final : true,
      symbol : this.state.symbol,
    }
    this._getFetchData(data);
    
  }
  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.navigation.state;
    if(params && this.props.navigation.state.params && params.symbol != this.props.navigation.state.params.symbol){
      this.setState({
        broker : params.broker,
        symbol : params.symbol,
        symbol_lower : params.symbol_lower,
      });
      let data ={
        broker : params.broker,
        account : 'live',
        final : true,
        symbol : params.symbol,
      }
      this._getFetchData(data);
    }
    if(nextProps.time_server || this.props.time_server){
      this.setTransaction('setData');
    }
    
    if(nextProps.status_transation){
    }
  }
  componentDidUpdate(){
    if(this.props.status_transation && this.props.status_transation.status){
      this.setState({amount : 0, showToast : true, showToastStatus : this.props.status_transation.msg});
      let that = this;
      setTimeout(function() {
        that.setState({showToast : false, showToastStatus : ''});
      }, 2000);
      this.props._clearStatusTransation({status : false , msg : ''});
    }
  }
  stopSound(status){
    if(status){
      this.setState({is_mute : true}); 
      this.state.loopingSound.stop().release();
    }
    if(!status){
      this.setState({is_mute : false});  
      playSound(this.state.testInfo, this);
    }
  }
  
  setTransaction(is_transaction){
    if(is_transaction !== 'setData'){
      if(!this.state.is_transaction){
        let data ={
          broker : this.state.broker,
          account : 'live',
          final : true,
          symbol : this.state.symbol,
        }
        this._getFetchData(data);
      };
      this.setState({is_transaction : is_transaction, time : 30});
    }else{

      // set deafault time server
      if(this.props.time_server != ''){
        let time = this.props.time_server;
        //let d = new Date(time);
        //let seconds = d.getSeconds();
        seconds = parseInt(time.substr(-2));
        
        if (seconds <= 29) {
          start   = 29 - seconds === 0 ? false : true;
          seconds = 29 - seconds === 0 ? 29 : 29 - seconds;
        }
        else {
          seconds = 60 - seconds;
          start = false;
        }
        if(isNaN(seconds)){
          this.setState({is_transaction : start, time : 30});
        }else{
          this.setState({is_transaction : start, time : seconds, phuoc : time});
        }
      }
    }
    
  }
  componentDidMount(){
    if(isNaN(this.state.time)){
          this.setTransaction('setData');
        }
  }
  _goToLogin() {
    this.props.navigation.navigate('Login');
  }

  componentWillUnmount() {
    //this.setTransaction('setData');
  }
  onScrollEndDrag(){

  }
  onMomentumScrollEnd(){
   
  }
  onLoadMore() {
    
  }
  onEndReached(){
  }
  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000)
  }

  _goHome(){
    if (!this.state.loopingSound) {
      return;
    }else{
        this.state.loopingSound.stop().release();
    }
    this.props.navigation.navigate('HomeNavigator');
  }

  _goMaket(){
    if (!this.state.loopingSound) {
      return;
    }else{
        this.state.loopingSound.stop().release();
    }
    
    this.props.navigation.navigate('MarketsNavigator');
  }
  onTrade(type, amount){
    Keyboard.dismiss();
    if(this.state.is_transaction){
      let data ={
        type : type,
        account : 'live',
        amount : amount ? amount : this.state.amount,
        symbol : this.state.symbol,
      }
      this.props._doTrade(data, true);
    }
  }
  setAmount(value){
    let amount = parseInt(this.state.amount ? this.state.amount : 0) + value;
    this.setState({amount : amount});
  }
  _updateDataWillFocus(){
    this.stopSound(false);
    this.setState({amount : 0});
  }
  renderItem(item){
    return(
      <View>
      {
        item.crypto_btc_usdt == 1 ?
        <View style={styles.circleRed} /> : <View style={styles.circleBlue} />
      }
      </View>
    );
  }
  renderContent() {
    let data = this.props.broker;
    let data_small = this.props.broker;
    let count = 0;
    let col = [];
    let broker = [];
    //////
    let count_small = 0;
    let col_small = [];
    let broker_small = [];
    let pre_item = 0;
    if(data){
      data.map(function(item, i) {
        count ++;
        if (count !== 7) {
          if(item.result === 1){
             col.push(<View key={'broker'+i} style={styles.circleRed} />);
          }else if(item.result === 2){
            col.push(<View key={'broker'+i} style={styles.circleBlue} />);
          }else{
            col.push(<View key={'broker'+i} style={styles.circleNull} />);
          }
          if(count === 6){
            broker.push(<View key={'broker_div'+i}>{col}</View>);
            col = [];
            count = 0;
          }
        }
      });
      data_small.map(function(item, i) {
        if(item.result != 0){
          if(pre_item != item.result && col_small.length > 0){
            broker_small.push(<View key={'broker_small_div'+i}>{col_small}</View>);
            col_small = [];
          }
          if(item.result === 1){
            col_small.push(<View key={'broker_small'+i} style={styles.circleRedSmall} />);       
          }
          if(item.result === 2){
            col_small.push(<View key={'broker_small'+i} style={styles.circleBlueSmall} />);

          }
          pre_item = item.result;
        }
      });
    }
    let report = this.props.report ? this.props.report : {};
    
    return (
      <View style={{flex: 1,  flexDirection: 'column', backgroundColor: "#232629"}}>
        <Content style={{flex: 1}}>
          <NavigationEvents
            onWillFocus={payload => this._updateDataWillFocus()}
            />
          <StatusBar barStyle="default" backgroundColor="#232629"/>
          {
            this.state.showToast ? <Toast
              visible={this.state.showToast != ''}
              position={deviceHeight/2}
              animation={true}
              backgroundColor='#318CC0'
            ><Text style={{color:'#ffffff'}}>{this.state.showToastStatus}</Text></Toast> : null
          }
          <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom : 0
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={()=> { this._goHome()}}>
                <View style={{alignItems: 'flex-start', paddingLeft: 10}}>
                  <MaterialCommunityIcons active name="arrow-left" style={{ color: "#ffffff", fontSize: 25 }}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 3}}>
              <TouchableOpacity onPress={()=> { this._goMaket()}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginTop :10, color: '#999', fontSize : 17}}>{this.state.symbol}
                    <MaterialCommunityIcons active name="menu-down" style={{ color: "#CAAB64", fontSize: 15 }}/>
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
          <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom : 0
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={()=> { }}>
                <View style={{alignItems: 'flex-start', marginLeft: 5}}>
                  <Text style={{marginTop :10, color: '#259374', fontSize : 16}}>BUY:
                    <Text style={{color: '#259374', fontSize : 16}}> ${report.buy_amout ? report.buy_amout.toFixed(2) : 0}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            
            
          </View>
          <View style={{height: 3, backgroundColor :'#161616', marginTop : 10, marginBottom : 10}}>
          </View>
          
          <View style={{height: 3, backgroundColor :'#161616', marginTop : 10, marginBottom : 5}}>
          </View>
          <View style={{height: 270, backgroundColor :'#161616', marginBottom : 10}}>
            <WebView
              source={{uri: 'https://RexWallet.io/chart'}}
            />
          </View>
          <View style={{flex : 1,flexDirection: 'row'}}>
            {broker}
            <View style={{marginLeft : 10, borderLeftColor :'#161616', borderLeftWidth : 3}}>
              <View style={{flex :1, flexDirection : 'row', marginLeft :10}}>
                {broker_small}
              </View>
            </View>
          </View>
        </Content>
        <View> 
          <View style={{opacity: this.state.is_transaction ? 1 : 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
            }}>
            <View style={{flex: 1, marginLeft: 5, marginRight: 5}}>
              <TouchableOpacity onPress={() => this.onTrade('buy')}>
                <Text style={{color: '#259374', fontSize : 18, textAlign:'right'}}>{this.props.report ? this.props.report.buy : ''} : BUY</Text>
                <Image
                    source={require("../../assets/images/buy_new.png")}
                    style={styles.buyButton}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection : 'row', height :35, marginTop : 22, marginLeft: 5, marginRight: 5, borderRadius:4, borderColor : '#272D33', borderWidth :0.3}}>
              {/*<View style={{flex : 1, borderRightColor : '#878C92', borderRightWidth : 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor :'#36E565'}}>
               <Text style={{color: '#272D33', fontSize : 18}}>-</Text>
              </View>*/}
              <View style={{flex : 3}}>
                <TextInput
                  keyboardType='numeric'
                  editable={this.state.is_transaction}
                  value={`${this.state.amount}`}
                  onChangeText={amount => this.setState({amount : amount})}
                  style={{backgroundColor:'#282C35', color: '#ffffff', height : 34}}/>
              </View>
              <TouchableOpacity 
                style={{width : 30, borderLeftColor : '#282C35', borderLeftWidth : 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor :'#282C35'}}
                onPress={()=> { this.setState({amount : ''})}}
              >
                <Text style={{ color: '#ffffff', fontSize : 15}}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, marginLeft: 5, marginRight: 5}}>
              <TouchableOpacity onPress={() => this.onTrade('sell')}>
                <Text style={{color: '#E34F5C', fontSize : 18, textAlign:'left'}}>SELL : {this.props.report ? this.props.report.sell : ''}</Text>
                <Image
                    source={require("../../assets/images/sell_new.png")}
                    style={styles.buyButton}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection : 'row', opacity: this.state.is_transaction ? 1 : 0.5}}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.setAmount(1)}>
                <Image
                    source={require("../../assets/images/1.png")}
                    style={styles.icoinImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.setAmount(3)}>
                <Image
                    source={require("../../assets/images/3.png")}
                    style={styles.icoinImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.setAmount(4)}>
                <Image
                    source={require("../../assets/images/5.png")}
                    style={styles.icoinImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.setAmount(10)}>
                <Image
                    source={require("../../assets/images/10.png")}
                    style={styles.icoinImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.setAmount(20)}>
                <Image
                    source={require("../../assets/images/20.png")}
                    style={styles.icoinImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.setAmount(30)}>
                <Image
                    source={require("../../assets/images/30.png")}
                    style={styles.icoinImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render(){
    return(
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'true'}
          style={{bottom: 0,left: 0, flex: 1}} contentContainerStyle={{bottom: 50,left: 0,flex: 1}} behavior={'padding'}
        >
           {this.renderContent()}
        </KeyboardAvoidingView>
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
    user: state.user.data,
    broker: state.trade.broker.rows,
    report: state.trade.broker.report,
    status_transation: state.trade.status_transation,
    time_server: state.trade.time_server,
  };
}

function mapDispatchToProps(dispatch) {
    return {
      _doTrade: (data) => dispatch(_doTrade(data)),
      _brokerFetchData: (data) => dispatch(_brokerFetchData(data)),
      _getTimeServer: (data) => dispatch(_getTimeServer()),
      _clearStatusTransation: (data) => dispatch(_clearStatusTransation(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
