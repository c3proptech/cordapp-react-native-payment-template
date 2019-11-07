import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform, Dimensions, StatusBar, TouchableOpacity, FlatList} from 'react-native';
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
import moment from 'moment';
import SideBar  from 'payment/screens/sideBar/index.js';
import * as walletActions from 'payment/store/actions/wallet';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;



class Transaction extends Component {
 static navigationOptions = ({ navigation, screenProps}) => {
    console.log(navigation);
    return {
      title: navigation.getParam('wallet', 'A Nested Details Screen').token_name,
      //header: null,
      //tabBarVisible: false
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      'wallet': this.props.navigation.getParam('wallet'),
      refreshing : false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  componentWillMount() {
    this.props.walletActions._getWalletSelected({'token_symbol': this.state.wallet.token});
    this.props.walletActions._resetWalletTransactions();
  }

  componentDidMount() {
    this.props.walletActions._getWalletTransactions({'token_symbol': this.state.wallet.token});
  }

  toggleMenu() {
    this.props.navigation.toggleDrawer();
  }

  _goToRequest(wallet){
    this.props.navigation.navigate({ routeName: 'Request', params: {wallet: wallet}});
  }

  _goToSend(wallet){
    this.props.navigation.navigate({ routeName: 'QRcode', params: {wallet: wallet}});
  }
  
  onRefresh() {

  }

  onLoadMore() {

  }

  renderRow(item, sectionId, rowId) {
    return (
      <View style={{flex : 1, flexDirection : 'row', borderBottomColor : '#999', borderBottomWidth : 0.3, padding: 5}}>
        <View style={{width : 70}}>
          {
            item.category == 'receive' ? 
            <Icon type="Ionicons" name="trending-down" style={{ color: Theme.darkPrimaryColor, fontSize: 45 }}/> : 
            <Icon type="Ionicons" name="trending-up" style={{ color: '#999', fontSize: 45 }}/>
          }
        </View>
        <View style={{ flex : 1, alignItems  :'flex-start', justifyContent : 'center'}}>
          <Text style={{fontSize : 16 , color : '#999'}}>{item.status_text}</Text>
        </View>
        <View style={{width : 100, alignItems  :'flex-end', justifyContent : 'center'}}>
          <Text style={{color : '#2196D6', fontSize : 16}}>{item.amount} BTC</Text>
          <Text note>{moment.utc(item.time * 1000).format('MM-DD HH:mm:ss')}</Text>
        </View>
      </View>
    );
  }

  renderFirst() {
      return Array.apply(null, Array(parseInt(deviceHeight / 100))).map(
          (number, value) => {
              return (
                  <View style={{ padding: 10, opacity: 0.3 }} key={value}>
                      <Placeholder.ImageContent
                          position="left"
                          animate="fade"
                          lineNumber={3}
                          textSize={17}
                          lineSpacing={5}
                          width="100%"
                          lastLineWidth="70%"
                          firstLineWidth="100%"
                          size={60}
                      />
                  </View>
              );
          }
      );
  }
  /*renderHeader() {
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
                <Text style={{marginTop :5, color: '#ffffff', fontSize : 17}}>My Bitcoins</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.toggleMenu()} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
                <View style={{ marginLeft: 20 }}>
                  <Icon type="FontAwesome" name="bars" style={{ color: 'white', fontSize: 22, fontWeight: 'bold'}} />
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }*/
  
  render() {
    const { selected } = this.props;
    return (
      <Container style={{backgroundColor: "#FAFAFA"}}>
        {/*<StatusBar barStyle="light-content" backgroundColor={Theme.darkPrimaryColor}/>*/}
        <View style={{flex : 1, flexDirection: 'column', backgroundColor : Theme.darkPrimaryColor}}>
          {/*<View style={AppStyle.headerView}>
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
                    <Text style={{marginTop :5, color: '#ffffff', fontSize : 17}}>My Bitcoins</Text>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => this.toggleMenu()} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
                    <View style={{ marginLeft: 20 }}>
                      <Icon type="FontAwesome" name="bars" style={{ color: 'white', fontSize: 22, fontWeight: 'bold'}} />
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
          </View>*/}
          {/*this.renderHeader()*/}
          <View style={{flex : 2, backgroundColor : Theme.darkPrimaryColor}}>
            <TouchableOpacity style={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>
              {
                /*this.state.wallet.token === 'BTC' ?
                <Foundation active name="bitcoin-circle" style={{ color: Theme.colorLoginText, fontSize: 45 }}/> :
                this.state.wallet.token === 'ETH' ?
                <MaterialCommunityIcons active name="ethereum" style={{ color: Theme.colorLoginText, fontSize: 45 }}/> :
                this.state.wallet.token === 'USD' ? 
                <FontAwesome active name="usd" style={{ color: Theme.colorLoginText, fontSize: 45 }}/> : ''*/
              }
              <Text style={{fontSize: 35, color : '#ffffff'}}>{selected.balance} {selected.token}</Text>
              {/*<Text style={{color : '#ffffff'}}>$ 0.00</Text>*/}
            </TouchableOpacity>
            <View style={{height : 80, flexDirection: 'row', backgroundColor :Theme.darkPrimaryColor}}>
              <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.darkPrimaryColor, paddingLeft: 10, paddingRight : 5}}>
                <Button iconLeft bordered full rounded
                  style={{ borderColor : Theme.colorLoginText, height:50}}
                  onPress={()=> { this._goToSend(this.state.wallet)}}
                >
                  <Icon name='send' style={{color : '#ffffff', fontSize: 30}}/>
                  <Text style={{color : '#ffffff'}}>Send</Text>
                </Button>
              </View>
              <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.darkPrimaryColor, paddingLeft: 5, paddingRight : 10}}>
                <Button iconLeft bordered full rounded
                  style={{ borderColor : Theme.colorLoginText, height:50}}
                  onPress={()=> { this._goToRequest(this.state.wallet)}}                  
                >
                  <Icon name='download' style={{ color : '#ffffff', fontSize: 30 }}/>
                  <Text style={{color : '#ffffff'}}>Request</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={{flex : 3, flexDirection: 'column'}}>
            {/*<View style={{flex : 1, margin : 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff"}}>
              <Foundation active name="bitcoin-circle" style={{ color: Theme.colorLoginText, fontSize: 60 }}/>
               <Text>Buy Bitcoins with Creadit Card</Text>
            </View>*/}

            {/*<View style={{flex : 1, justifyContent: 'flex-start', backgroundColor : '#ffffff', alignItems: 'center', borderRadius: 10, margin: 20}}>
               <Text style={{color:'#1C6994'}}>No transaction data</Text>
            </View>*/}
            <View style={{flex : 1, flexDirection : 'row', padding : 10, justifyContent: 'flex-start', backgroundColor : '#ffffff', borderRadius: 10, marginLeft: 20, marginRight: 20}}>
              <FlatList
                    //ref={(flatListView) => this.flatListView = flatListView}
                    data={this.props.transactions}
                    extraData={this.props.transactions}
                    renderItem={({ item }) =>
                        this.renderRow(item)
                    }
                    //keyExtractor={item => item.id.toString()}
                    //keyboardShouldPersistTaps="always"
                    refreshing={this.state.refreshing}
                    //style={{ height: deviceHeight - 90 }}
                    onRefresh={this.onRefresh.bind(this)}
                    onEndReached={this.onLoadMore.bind(this)}
                    onEndReachedThreshold={
                        Platform.OS === "ios" ? -0.1 : 0.1
                    }
                    //ListFooterComponent={<LoadingMore isLoadingMore={this.state.isLoadingMore} />}
                />
            </View>
          </View>
        </View>
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
    selected: state.wallet.selected,
    transactions: state.wallet.transactions.rows
  };
}

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
