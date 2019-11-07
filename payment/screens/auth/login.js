import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Content, Item, Input, Button, Text, CheckBox, Icon, View , Spinner,ListItem, Left, Body, Right, } from 'native-base';
import Images  from 'payment/configs/images.js';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import { NavigationActions } from 'react-navigation';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
import { JSEncrypt } from 'jsencrypt';
import Define from 'payment/configs/define';
import {_doLogIn, changeLoadingStatus} from 'payment/store/actions/common';

let encrypt = new JSEncrypt();
encrypt.setPublicKey(Define.publicKey);
class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false
  });
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_pass: '',
      userValid: false,
      passValid: false,
      auto_login : true,
		};
    // this.checkLoginCallBack = _.debounce(function (e) { e.persist();this._checkLogin(); }, 500);
    // this._goToRegisterCall = _.debounce(function (e) {e.persist();this._goToRegister();}, 200);
    this.navigation = this.props.navigation;
    const {language} = this.props;
  }
  validateLogin () {
    let valid = true;
    const user_nameValidError = validate('username', this.state.user_name);
    const passWordValidError = validate('password', this.state.user_pass);
    
    if(user_nameValidError){
      Alert.alert('RexWallet', user_nameValidError);
      return false;
    }

    if(passWordValidError){
      Alert.alert('RexWallet', passWordValidError);
      return false;
    }
    // this.setState({
    //   user_nameValid: user_nameValidError ? false :  true,
    //   passValid: passWordValidError ? false :  true,
    // });
    
    // if (!this.state.user_nameValid || !this.state.passValid) {
    //   return false;
    // }

    return true;
  }
  onPressAutoLogin(status){
    this.setState({auto_login : !status });    
  }

  onPressLogin(){
    if (this.validateLogin()) {
      this.setState({ loading: true });
      var domain = this.state.domain;
      console.log('this.state', this.state);
      var user_name = encrypt.encrypt(this.state.user_name);
      var user_pass = encrypt.encrypt(this.state.user_pass);
      var form = new FormData();
      form.append('user_name', user_name);
      form.append('user_pass', user_pass);
      console.log('_checkLogin',form);  
      var data ={
          baseURL : 'https://example.io/api/v1/',
          data : {
            user_name: user_name, 
            user_pass: user_pass, 
          }
      }
      this.props._doLogIn(data);
    }
    else {
      this.setState({loading: false});

    }
  }
  _goToRegister() {
    this.props.navigation.navigate('Register');
  }
  _goToFogot() {
    this.props.navigation.navigate('Forgot');
  }

  render() {
    return (
      <Container style={{backgroundColor: '#9d0100'}}>
          <StatusBar barStyle="light-content" backgroundColor={Theme.darkPrimaryColor} />

          <View
            style={styles.imageContainer}
          >
          <Content style={styles.contentLogin}>
              <View style={{marginBottom : 30}}>
                <Image
                  source={Images.iconLogo}
                  style={styles.iconLogin}
                />
                <Text
                  style={{
                    fontSize: 45,
                    color: '#75d2d7',
                    textAlign: 'center',
                    textAlignVertical: 'center',

                  }}
                >
                </Text>
              </View>
              <View style={styles.loginFormNew}>
                  <View style={{flex : 1 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                    <View style={{width : 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text>User Name</Text>
                    </View>
                    <View style={{flex : 3}}>
                      <Input
                          style={{paddingBottom: 0, marginBottom: 0}}
                          placeholder='user name'
                          placeholderTextColor={'#999'}
                          value={this.state.user_name}
                          onChangeText={user_name => this.setState({ user_name, userValid: validate('user_name', this.state.user_name) ? false : true })}
                        />
                    </View>
                  </View>
                  <View style={{flex : 1 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                    <View style={{width : 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text >Password</Text>
                    </View>
                    <View style={{flex : 3}}>
                      <Input
                        style={{paddingBottom: 0, marginBottom: 0}}
                        secureTextEntry={true}
                        placeholder='password'
                        placeholderTextColor={'#999'}
                        value={this.state.user_pass}
                        onChangeText={user_pass => this.setState({ user_pass })}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={{marginTop: 40}}>
                      <Button block bordered rounded
                         style={{ borderColor : Theme.colorLoginText, height:50, backgroundColor : Theme.backGroudButton }}
                         onPress={() => this.onPressLogin()}
                      >
                        {
                          this.props.loading ? <Spinner color={Theme.colorLoginInput}/> :
                          <Text style={{fontSize: 25 ,color : Theme.colorLoginInput}}>Login</Text>
                        }
                        
                      </Button>
                    </View>
                  </View>
              </View>
              <View>
                <View style={{marginTop:30,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this._goToFogot()} >
                      <Text style={{color : Theme.colorButton}}>Forgot your password ? </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => this._goToRegister()}  style={{marginTop:20,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color : Theme.colorButton}}>Don't have an account yet ? </Text>
                    <View>
                      <Text style={{color : Theme.colorButton}}>Register</Text>
                    </View>
                  </TouchableOpacity>
              </View>
            </Content>
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
	};
}

function mapDispatchToProps(dispatch) {
  	return {
       _doLogIn: (data) => dispatch(_doLogIn(data)),
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
