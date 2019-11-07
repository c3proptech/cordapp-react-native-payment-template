import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { Container, Content, View, Item, Input, Button, Text, CheckBox, Icon, ListItem, Left, Body, Right, Tab, Tabs, TabHeading, } from 'native-base';
import Images  from 'payment/configs/images.js';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_doTrade, _brokerFetchData} from 'payment/store/actions/trade';
class Markets extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false
  });
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user_pass: '',
      domainValid: false,
      idValid: false,
      passValid: false,
      auto_login : true,
    };
  }

  onPressForgot(){
    
  }
  _goToTrade(params) {
    // let data ={
    //     broker : params.broker,
    //     account : 'live',
    //     final : true,
    //     symbol : params.symbol,
    //     //Token: this.props.session.token
    // }
    // this.props._brokerFetchData(data, true);
    this.props.navigation.navigate({ routeName: 'Trade', params: params});
  }
  _list1_1(){
    return(
      <ScrollView>
        <View style={{flex : 1, flexDirection: 'row', paddingTop : 10, paddingBottom :10, paddingLeft : 10, paddingRight : 10, backgroundColor : '#151A20'}}>
          <View style={{flex :1}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>Pair /<Text style={{color: '#f5bc00', fontSize : 14}}> Vol ↓</Text></Text>
          </View>
          <View style={{flex :1, alignItems:'flex-start'}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>Last Price</Text>
          </View>
          <View style={{flex :1, alignItems:'flex-end'}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>24h Chag%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>JPY <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>Vol 69.138</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-start', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.002729</Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>$5.95</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +24.26% </Text></Button></View>
            </View>
           </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>CAD <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 17}}>0.233434</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +26.43% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>EUR <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 17}}>0.00003364</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +18.58% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>GBP <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#289476', fontSize : 17}}>0.00007970</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +14.71% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>AUD <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.10343570</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +12.21% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
        <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>HKD <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.00745565</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +34.27% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>CNH <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 17}}>0.00004378</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +17.11% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade()}}>
        <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>RUB <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
            </View>
            <View style={{flex :1, alignItems:'center', justifyContent :'center'}}>
              <Text style={{color: '#289476', fontSize : 17}}>0.00014689</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +23.41% </Text></Button></View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  _CRYPTO(){
    return(
      <View>
        <View style={{flex : 1, flexDirection: 'row', paddingTop : 10, paddingBottom :10, paddingLeft : 10, paddingRight : 10, backgroundColor : '#151A20'}}>
          <View style={{flex :1}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>Pair /<Text style={{color: '#f5bc00', fontSize : 14}}> Vol ↓</Text></Text>
          </View>
          <View style={{flex :1, alignItems:'flex-start'}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>Last Price</Text>
          </View>
          <View style={{flex :1, alignItems:'flex-end'}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>24h Chag%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=> { this._goToTrade({broker : 'CRYPTO', symbol : 'CRYPTO:BTC:USDT', symbol_lower : 'crypto_btc_usdt'})}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>BTC <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USDT</Text></Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>Vol 69.138</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-start', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.002729</Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>$5.95</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +24.26% </Text></Button></View>
            </View>
           </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade({broker : 'CRYPTO', symbol : 'CRYPTO:ETH:USDT', symbol_lower : 'crypto_eth_usd'})}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>ETH <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USDT</Text></Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>Vol 69.138</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-start', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.002729</Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>$5.95</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +27.12% </Text></Button></View>
            </View>
           </View>
        </TouchableOpacity>
      </View>
    );
  }
  _FOREX(){
    return(
      <View>
        <View style={{flex : 1, flexDirection: 'row', paddingTop : 10, paddingBottom :10, paddingLeft : 10, paddingRight : 10, backgroundColor : '#151A20'}}>
          <View style={{flex :1}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>Pair /<Text style={{color: '#f5bc00', fontSize : 14}}> Vol ↓</Text></Text>
          </View>
          <View style={{flex :1, alignItems:'flex-start'}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>Last Price</Text>
          </View>
          <View style={{flex :1, alignItems:'flex-end'}}>
            <Text style={{color: '#9DA0A6', fontSize : 14}}>24h Chag%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=> { this._goToTrade({broker : 'FOREX', symbol : 'FOREX:EUR:USD', symbol_lower : 'forex_eur_usd'})}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>EUR <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>Vol 69.138</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-start', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.002729</Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>$5.95</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +24.26% </Text></Button></View>
            </View>
           </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { this._goToTrade({broker : 'FOREX', symbol : 'FOREX:GBP:USD', symbol_lower : 'forex_gbp_usd'})}}>
          <View style={{flex : 1, flexDirection: 'row', paddingTop : 15, paddingBottom :15, paddingLeft : 10, paddingRight : 10, backgroundColor : '#12151C', borderBottomColor : '#1B222C', borderBottomWidth: 0.25}}>
            <View style={{flex :1, justifyContent :'center'}}>
              <Text style={{color: '#ffffff', fontSize : 18}}>GBP <Text style={{color: '#9DA0A6', fontSize : 12}}>/ USD</Text></Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>Vol 69.138</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-start', justifyContent :'center'}}>
              <Text style={{color: '#B8185C', fontSize : 17}}>0.002729</Text>
              <Text style={{color: '#9DA0A6', fontSize : 12}}>$5.95</Text>
            </View>
            <View style={{flex :1, alignItems:'flex-end'}}>
              <View><Button small style={{backgroundColor :'#1EBD88'}}><Text> +27.12% </Text></Button></View>
            </View>
           </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <Container style={{backgroundColor : '#232629'}}>
        <StatusBar barStyle="default" backgroundColor="red"/>
        <Content>
          <View>
            <ListItem icon last>
              <Body>
                <Text style={{color:'#9DA0A6', textAlign: 'center'}}>Markets</Text>
              </Body>
              <Right>
                <Icon active name="search" style={{fontSize: 30}}/>
              </Right>
            </ListItem>
            <Tabs tabBarUnderlineStyle={styles.tabBarUnderline} activeTextStyle={{color : 'red'}}>
              <Tab activeTextStyle={{color : '#f5bc00'}} heading="CRYPTO">
                  {this._CRYPTO()}
              </Tab>
              <Tab activeTextStyle={{color : '#f5bc00'}} heading="FOREX">
                  {this._FOREX()}
              </Tab>
            </Tabs>
          </View>
          
        </Content>
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
	};
}

function mapDispatchToProps(dispatch) {
  return {
      _brokerFetchData: (data) => dispatch(_brokerFetchData(data)),
    }; 	
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);
