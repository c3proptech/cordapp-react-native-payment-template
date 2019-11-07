import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StatusBar, TouchableOpacity, Modal, ImageBackground, FlatList, Platform} from 'react-native';
import { Container, View, Text, Icon, ListItem, Left, Body, Right } from 'native-base';
import Images  from 'payment/configs/images.js';
import AppStyle  from 'payment/configs/styles';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as walletActions from 'payment/store/actions/wallet';

class Home extends Component {

 static navigationOptions = ({ navigation, screenProps}) => {
    return {
      title: 'Wallet',
      header: null,
      tabBarVisible: false
    }
  };

  constructor(props) {
    super(props);

    this.reRender = this.props.navigation.addListener('willFocus', () => {
      this.props.walletActions._getWalletList();
    });

    this.state = {
      refreshing : false,
      showBalance : true
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  componentWillMount() {
    this.props.walletActions._getWalletList();
  }

  componentWillUnmount() {
    this.reRender;
  }

  _goToTranSaction(wallet){
    this.props.navigation.navigate({ routeName: 'Transaction', params: {wallet: wallet}});
  }

  toggleMenu() {
    this.props.navigation.toggleDrawer();
  }

  onRefresh() {
    this.props.walletActions._getWalletList();
  }

  onLoadMore() {

  }

  renderRow(item, sectionId, rowId) {
    return (
      <TouchableOpacity 
        onPress={()=> { this._goToTranSaction(item)}}
        style={{flexDirection: 'row', height : 50, alignItems: 'center', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
        {/*<View style={{width : 60, justifyContent: 'center', alignItems : 'center'}}>
          {
            item.token === 'BTC' ?
            <Foundation active name="bitcoin-circle" style={{ color: Theme.darkPrimaryColor, fontSize: 35 }}/> :
            item.token === 'ETH' ?
            <MaterialCommunityIcons active name="ethereum" style={{ color: Theme.darkPrimaryColor, fontSize: 35 }}/> :
            item.token === 'USD' ? 
            <FontAwesome active name="usd" style={{ color: Theme.darkPrimaryColor, fontSize: 30 }}/> : ''
          }
        </View>*/}
        <View style={{flex : 3, marginLeft : 10}}>
          <Text>{item.token}</Text>
        </View>
        <View style={{width : 200, alignItems : 'flex-end', marginRight : 10}}>
          <Text numberOfLines={1}>{item.total}</Text>
          <Text note numberOfLines={1}>{item.token_name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  _COINS(){
    return(
      <View style={{flex: 1}}>
        <FlatList
            //ref={(flatListView) => this.flatListView = flatListView}
            data={this.props.wallet_list}
            extraData={this.props.wallet_list}
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
        {/*typeof this.props.wallet_list !== 'undefined' && this.props.wallet_list.map((item, i) => {     
          return (
              <TouchableOpacity 
                onPress={()=> { this._goToTranSaction(item.token)}}
                style={{flexDirection: 'row', height : 50, alignItems: 'center', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <View style={{width : 60, justifyContent: 'center', alignItems : 'center'}}>
                  {
                    item.token === 'BTC' ?
                    <Foundation active name="bitcoin-circle" style={{ color: Theme.darkPrimaryColor, fontSize: 35 }}/> :
                    item.token === 'ETH' ?
                    <MaterialCommunityIcons active name="ethereum" style={{ color: Theme.darkPrimaryColor, fontSize: 35 }}/> :
                    item.token === 'USD' ? 
                    <FontAwesome active name="usd" style={{ color: Theme.darkPrimaryColor, fontSize: 30 }}/> : ''
                  }
                </View>
                <View style={{flex : 3}}>
                  <Text>{item.token_name}</Text>
                </View>
                <View style={{width : 100, alignItems : 'flex-end', marginRight : 10}}>
                  <Text numberOfLines={1}>{item.total}</Text>
                  <Text note numberOfLines={1}>{item.token}</Text>
                </View>
              </TouchableOpacity>
            )
        })*/}
      </View>
    );
  }
  
  renderHeader(){
    return(
      <View style={AppStyle.headerView}>
        <StatusBar
          backgroundColor={Theme.darkPrimaryColor}
          barStyle="light-content"
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{flex: 1}}>
              <View style={{alignItems: 'center', justifyContent : 'center'}}>
                  <Text style={{marginTop :5, color : '#ffffff'}}>Help</Text>
                </View>
            </View>
            <View style={{flex: 3}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{marginTop :5, color: '#ffffff', fontSize : 17}}>
                  Wallets
                </Text>
              </View>
            </View>
            {/*<View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.toggleMenu()} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
                  <View style={{ marginLeft: 20 }}>
                      <Icon type="FontAwesome" name="bars" style={{ color: 'white', fontSize: 22, fontWeight: 'bold', }} />
                  </View>
              </TouchableOpacity>
            </View>*/}
        </View>
      </View>
    )
  }
  render() {
    const { wallet_sum } = this.props;

    return (
      <Container style={{backgroundColor: "#FAFAFA"}}>
        <StatusBar barStyle="light-content" backgroundColor={Theme.darkPrimaryColor}/>
        <View style={{flex : 1, flexDirection: 'column', backgroundColor: Theme.darkPrimaryColor,}}>
          {/*this.renderHeader()*/}
          <Text style={{color: '#ffffff', fontSize: 50, textAlign: 'center', backgroundColor: Theme.darkPrimaryColor, paddingTop: 30}}>Wallet</Text>
          <TouchableOpacity onPress={() => this.setState({showBalance : !this.state.showBalance})} style={{flex : 1, justifyContent: 'center', backgroundColor: Theme.darkPrimaryColor}}>
             {
                !this.state.showBalance ?
                <View style={{justifyContent : 'center', alignItems : 'center'}}>
                  <Text style={{color: "#ffffff", fontSize: 20, marginBottom : 5}}>Total Balance</Text>
                  <Text style={{color: "#ffffff", fontSize: 35}}>$ {wallet_sum.total_usd}</Text>
                </View> : 
                <View style={{justifyContent : 'center', alignItems : 'center'}}>
                  <Text style={{color: "#ffffff", fontSize: 20}}>click to show balance</Text>
                </View>
             }
          </TouchableOpacity>
          <View style={{flex : 4, backgroundColor: '#ffffff', borderRadius: 10, margin: 20}}>
            {this._COINS()}
            <View style={{flex : 1}}></View>
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
    wallet_list: state.wallet.list.rows,
    wallet_sum: state.wallet.list.sum
  };
}

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
