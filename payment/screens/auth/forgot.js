import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, AlertIOS, Alert, StatusBar, TouchableOpacity} from 'react-native';
import { Container, Content, View, Item, Input, Button, Text, CheckBox, Icon } from 'native-base';
import Images  from 'payment/configs/images.js';
import styles  from './styles';
import Theme  from 'payment/configs/theme';
import validate from 'payment/configs/validation';
import I18n from 'react-native-i18n';
class Forgot extends Component {
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
  _goToLogin() {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <Container style={{backgroundColor: '#9d0100'}}>
          <StatusBar barStyle="dark-content" backgroundColor="#263238"/>
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
                      <Text>Email</Text>
                    </View>
                    <View style={{flex : 3}}>
                      <Input
                        style={{paddingBottom: 0, marginBottom: 0}}
                        placeholder='email'
                        placeholderTextColor={'#999'}
                      />
                    </View>
                </View>
                <View>
                  <View style={{marginTop: 20}}>
                    <Button block bordered rounded
                       style={{ borderColor: Theme.colorLoginText, height:50, backgroundColor : Theme.backGroudButton }}
                       onPress={() => this.onPressForgot()}
                    >
                      <Text style={{fontSize: 25, color : Theme.colorLoginInput}}>Submit</Text>
                    </Button>
                  </View>
                </View>
              </View>
              <View style={{marginTop:30,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
    session: state.user.session,
	};
}

function mapDispatchToProps(dispatch) {
  return {
    }; 	
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
