import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { Container, Content, View, Item, Input, Button, Text, CheckBox, Icon , Thumbnail } from 'native-base';
import Images  from 'payment/configs/images.js';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class Home extends Component {
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
      dataSource: [
        {
          title: 'Phnom Penh Villa',
          caption: 'Phnom Penh Villa',
          url: require("../../assets/images/slider1.jpeg"),
        }, {
          title: 'Phnom Penh Condo',
          caption: 'Phnom Penh Condo',
          url: require("../../assets/images/slider2.png"),
        }, {
          title: 'Phnom Penh Office',
          caption: 'Phnom Penh Office',
          url: require("../../assets/images/slider3.jpeg"),
        },
        {
          title: 'Phnom Penh Villa',
          caption: 'Phnom Penh Villa',
          url: require("../../assets/images/slider1.jpeg"),
        },
      ],
    };
  }
  componentWillMount() {
    setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : (this.state.position + 1 < 4 ? this.state.position + 1 : 0)
        });
    }, 2000)
  }
  _goToLogin() {
    this.props.navigation.navigate('Login');
  }
  _slideshow(){
    return (
      <Swiper showsButtons={true} height={200} autoplay={true}>
        <Image
            source={require("../../assets/images/slider1.jpeg")}
            style={styles.slider}
        />
        <Image
            source={require("../../assets/images/slider2.png")}
            style={styles.slider}
        />
        <Image
            source={require("../../assets/images/slider3.jpeg")}
            style={styles.slider}
        />
        <Image
            source={require("../../assets/images/slider4.jpeg")}
            style={styles.slider}
        />
      </Swiper>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
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
  render() {
    
    return (
      <Container style={{backgroundColor: "#242e47", paddingBottom : 20}}>
        <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor={Theme.dark}
                titleColor={Theme.dark}
                color={['#ff0000', '#00ff00', Theme.dark]}
                progressBackgroundColor="#ffff00"
            />

          }
          onLoadMore={this.onLoadMore.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          onScrollEndDrag={this.onScrollEndDrag.bind(this)}
          onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
        >
        {this._slideshow()}
        <View style={{paddingTop : 20}}>
          <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom : 0
          }}>
            <View style={{flex: 1, borderRightColor : '#e6e6e6', borderRightWidth: 0.3}}>
              <TouchableOpacity onPress={()=> { this._goList()}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginTop :10, color: '#d8e1eb', fontSize : 11}}>BNB/BTC</Text>
                  <Text style={{marginTop :10, color: '#ea0070', fontSize : 18}}>0.0000378</Text>
                  <Text style={{marginTop :10, color: '#70a800'}}>+ 0.39%</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, borderRightColor : '#e6e6e6', borderRightWidth: 0.3}}>
              <TouchableOpacity onPress={()=> { this._goList()}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginTop :10, color: '#d8e1eb', fontSize : 11}}>EOS/BTC</Text>
                  <Text style={{marginTop :10, color: '#ea0070', fontSize : 18}}>0.0008164</Text>
                  <Text style={{marginTop :10, color: '#70a800'}}>+ 0.39%</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, borderRightColor : '#e6e6e6', borderRightWidth: 0.3}}>
              <TouchableOpacity onPress={()=> { this._goList()}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginTop :10, color: '#d8e1eb', fontSize : 11}}>ETC/BTC</Text>
                  <Text style={{marginTop :10, color: '#ea0070', fontSize : 18}}>0.002091</Text>
                  <Text style={{marginTop :10, color: '#ea0070'}}>+ 0.39%</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{paddingTop : 20}}>
          <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopColor : '#e6e6e6', borderTopWidth: 0.3, marginLeft :10 , marginRight : 10
          }}>
            <FontAwesome
              name="volume-up"
              size={26}
            />
          </View>
        </View>

        <View style={{paddingTop : 20}}>
          <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom : 0
          }}>
            <View style={{flex: 0.25}}>
              <TouchableOpacity onPress={()=> { this._goList()}}>
                <View style={{alignItems: 'center'}}>
                  <Thumbnail source={require("../../assets/images/support.jpeg")}/>
                  <Text style={{marginTop :10, color: '#d8e1eb'}}>Support</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.25, alignItems: 'center', justifyContent: 'center'}} onPress={()=> { this._goCategories()}}>
              <TouchableOpacity onPress={()=> { this._goCategories()}}>
                <View style={{alignItems: 'center'}}>
                  <Thumbnail source={require("../../assets/images/favorite.png")} />
                  <Text style={{marginTop :10, color: '#d8e1eb'}}>Favorite</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.25, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=> { this._goCategories()}}>
                <View style={{alignItems: 'center'}}>
                 <Thumbnail source={require("../../assets/images/deposit.png")} />
                  <Text style={{marginTop :10, color: '#d8e1eb'}}>Deposit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.25, alignItems: 'center', justifyContent: 'center',}} onPress={()=> { this._goListPhoto()}}>
              <TouchableOpacity onPress={()=> { this._goListPhoto()}}>
                <View style={{alignItems: 'center'}}>
                  <Thumbnail source={require("../../assets/images/withdrawal.jpeg")} />
                  <Text style={{marginTop :10, color: '#d8e1eb'}}>Withdrawal</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
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
      
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
