import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity} from 'react-native';
import { Container, Content, View, Item, Input, Button, Text, CheckBox, Icon } from 'native-base';
import Images  from 'payment/configs/images.js';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
import { JSEncrypt } from 'jsencrypt';
import Define from 'payment/configs/define';
import {_doRegister, changeLoadingStatus} from 'payment/store/actions/common';

let encrypt = new JSEncrypt();
encrypt.setPublicKey(Define.publicKey);
class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false
  });
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      user_name: '',
      email : '',
      password: '',
      repassword : '',
      sponsor: '',
      conditions : false,

      fullNameValid: false,
      userNameValid: false,
      emailValid : false,
      passwordValid: false,
      repasswordValid: false,
      sponsorValid: false,
    };
  }
  validate () {
    let valid = true;
    const fullNameValidError = validate('name', this.state.full_name);
    const userNameValidError = validate('name', this.state.user_name);
    const emailValidError = validate('email', this.state.email);
    const passWordValidError = validate('pass', this.state.password);
    const passWord2ValidError = validate('pass2', this.state.repassword, ['pass', this.state.password]);
    const sponsorValidError = validate('id', this.state.sponsor);
    

    this.setState({
      fullNameValid: fullNameValidError ? false :  true,
      userNameValid: userNameValidError ? false :  true,
      emailValid: emailValidError ? false :  true,
      passwordValid: passWordValidError ? false :  true,
      repasswordValid: passWord2ValidError ? false :  true,
      sponsorValid: sponsorValidError ? false :  true,
    });
    
    if (!this.state.fullNameValid || !this.state.userNameValid || !this.state.emailValid || !this.state.passwordValid || !this.state.repasswordValid) {
      return false;
    }

    return true;
  }

  onPressRegister() {
    if (this.validate()) {

      if (!this.state.conditions) {
        Alert.alert('RexTech Inc.', 'Please check Agree Conditions');
        return false;
      }

      this.setState({ loading: true });
      var fullname = encrypt.encrypt(this.state.full_name);
      var username = encrypt.encrypt(this.state.user_name);
      var email = encrypt.encrypt(this.state.email);
      var sponsor = this.state.sponsor;
      var password = encrypt.encrypt(this.state.password);
      var re_type_password = encrypt.encrypt(this.state.repassword);

      var data ={
          fullname: fullname,
          username: username,
          email   : email,
          sponsor : sponsor,
          password: password,
          re_type_password: re_type_password,
          user_type: 'wallet',
      }
      this.props._doRegister(data);
    } else  {
      this.setState({loading: false});
      Alert.alert('RexTech Inc.', 'Please check data.');
      return false;
    }
  }

  _goToLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container style={{backgroundColor: '#9d0100'}}>
          {/*<StatusBar barStyle="dark-content" backgroundColor="#263238"/>*/}
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
                    <Text>Full name</Text>
                  </View>
                  <View style={{flex : 3}}>
                    <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      placeholder='Enter your name'
                      autoCapitalize = 'none'
                      placeholderTextColor={Theme.placeholderTextColor}
                      value={this.state.full_name}
                      onChangeText={full_name => this.setState({ full_name, fullNameValid : validate('full_name', this.state.full_name) ? false : true })}
                      onBlur={() => {
                        this.setState({
                          fullNameValid: validate('full_name', this.state.full_name) ? false : true
                        })
                      }}
                    />
                  </View>
                  <View style={{width : 30, justifyContent: 'center'}}>
                    <Icon style={{fontSize : 25}} name={ this.state.fullNameValid ? 'checkmark-circle' : 'close-circle' } />
                  </View>
                </View>

                <View style={{flex : 1 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                  <View style={{width : 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text>Tài khoản</Text>
                  </View>
                  <View style={{flex : 3}}>
                    <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      placeholder='Enter your user name'
                      autoCapitalize = 'none'
                      placeholderTextColor={Theme.placeholderTextColor}
                      value={this.state.user_name}
                      onChangeText={user_name => this.setState({ user_name, userNameValid : validate('user_name', this.state.user_name) ? false : true })}
                      
                    />
                  </View>
                  <View style={{width : 30, justifyContent: 'center'}}>
                    <Icon style={{fontSize : 25}} name={ this.state.userNameValid ? 'checkmark-circle' : 'close-circle' } />
                  </View>
                </View>

                <View style={{flex : 1 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                  <View style={{width : 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text>Email</Text>
                  </View>
                  <View style={{flex : 3}}>
                    <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      placeholder='Enter your email'
                      autoCapitalize = 'none'
                      placeholderTextColor={Theme.placeholderTextColor}
                      value={this.state.email}
                      onChangeText={email => this.setState({ email, emailValid : validate('email', this.state.email) ? false : true })}
                      
                    />
                  </View>
                  <View style={{width : 30, justifyContent: 'center'}}>
                    <Icon style={{fontSize : 25}} name={ this.state.emailValid ? 'checkmark-circle' : 'close-circle' } />
                  </View>
                </View>

                <View style={{flex : 1 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                  <View style={{width : 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text>Password</Text>
                  </View>
                  <View style={{flex : 3}}>
                    <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      secureTextEntry={true}
                      placeholder='Enter your password'
                      autoCapitalize = 'none'
                      placeholderTextColor={Theme.placeholderTextColor}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password, passwordValid : validate('password', this.state.password) ? false : true })}
                      onBlur={() => {
                        this.setState({
                          passwordValid: validate('password', this.state.password) ? false : true
                        })
                      }}
                    />
                  </View>
                  <View style={{width : 30, justifyContent: 'center'}}>
                    <Icon style={{fontSize : 25}} name={ this.state.passwordValid ? 'checkmark-circle' : 'close-circle' } />
                  </View>
                </View>

                <View style={{flex : 1 ,flexDirection : 'row', borderBottomWidth : 0.3, borderBottomColor: Theme.placeholderTextColor}}>
                  <View style={{width : 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text>Re-password</Text>
                  </View>
                  <View style={{flex : 3}}>
                    <Input
                      style={{paddingBottom: 0, marginBottom: 0}}
                      secureTextEntry={true}
                      placeholder='Retype password'
                      autoCapitalize = 'none'
                      placeholderTextColor={Theme.placeholderTextColor}
                      value={this.state.repassword}
                      onChangeText={repassword => this.setState({ repassword, repasswordValid : validate('repassword', this.state.repassword) ? false : true })}
                      onBlur={() => {
                        this.setState({
                          repasswordValid: validate('repassword', this.state.repassword) ? false : true
                        })
                      }}
                    />
                  </View>
                  <View style={{width : 30, justifyContent: 'center'}}>
                    <Icon style={{fontSize : 25}} name={ this.state.repasswordValid ? 'checkmark-circle' : 'close-circle' } />
                  </View>
                </View>  

                <View style={{marginTop: 15, flex: 1, flexDirection: 'row'}}>
                  <View style={{width : 20, alignItems : 'flex-start', marginLeft : -10}}>
                      <CheckBox
                      color='#75d2d7'
                      checked={this.state.conditions} 
                      onPress={() => this.setState({conditions: !this.state.conditions})}
                    />
                  </View>
                  <Text style={{marginLeft:20}}>I agree with Terms and Conditions</Text>
                </View>

                  <View>
                    <View style={{marginTop: 20}}>
                      <Button block bordered rounded
                         style={{ borderColor: Theme.colorLoginText, height:50, backgroundColor : Theme.backGroudButton }}
                         onPress={() => this.onPressRegister()}
                      >
                        <Text style={{fontSize: 25, color : Theme.colorLoginInput}}>Register</Text>
                      </Button>
                    </View>
                  </View>
              </View>
              <View style={{marginTop:20,display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <TouchableOpacity onPress={() => this._goToLogin()} >
                  <Text style={{color : Theme.colorButton}}>Login</Text>
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
	};
}

function mapDispatchToProps(dispatch) {
  	return {
       _doRegister: (data) => dispatch(_doRegister(data)),
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
