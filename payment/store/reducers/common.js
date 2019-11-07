import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  NativeModules,
  BackAndroid
} from 'react-native';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import { actionTypes } from './../actions/common';

let langRegionLocale = "en_US";

if (Platform.OS === "android") {
  langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
  langRegionLocale = NativeModules.SettingsManager.settings.KEY_LANG_USERDEFAULT_KEY || "en";
  console.log('zzzzzzzz',langRegionLocale);
}

let languageLocale = langRegionLocale.substring(0, 2);
const initialState = {
  isConnected: false,
  language: languageLocale,
  isLogout:false,
  isLogin: false,
  loading: false,
  errorNetwork: false,
  isRefreshing: false,
  session: [],
  resetPassStatus: false,
  loginStatus: false,
  apiWating : false,
  changeLanguage : false,
  list_car : [],
  car_now : [],
  changeStatusEditCar : 0,
  status_car : false,
  car_pendding : [],
  status_pincode : 0,
  status_update_pincode : 0
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {

    case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });

    case 'CHANGE_ERROR_NETWORK_STATUS':
      return Object.assign({}, state, {
        errorNetwork: action.errorNetwork,
      });

    case actionTypes.CHANGE_LOADING_STATUS:
      return Object.assign({}, state, {
        loading: action.loading,
        //changeLanguage : action.changeLanguage ? action.changeLanguage : false 
      });

    case actionTypes.CHANGE_API_LOADING_STATUS:
      console.log('777777777777777777',action);
      return Object.assign({}, state, {
        apiWating: action.apiWating,
      });

    case actionTypes.CHANGE_ISFRESHING_STATUS:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
      });

    case 'CHANGE_LANGUAGE' :
      I18n.locale = action.language
      return Object.assign({}, state, {
        language: action.language,
      });

    case actionTypes.LOG_OUT :
      return Object.assign({}, state, {
        isLogout: action.isLogout,
        isLogin: action.isLogin,
        session: []
      });
    case actionTypes.LOG_IN :
      return Object.assign({}, state, {
        isLogout: action.isLogout,
        isLogin: action.isLogin,
        session: action.session
      });

    case actionTypes.DO_LOGIN_STATUS :
      return Object.assign( {}, state, { 
        loginStatus: action.loginStatus, 
      });

    case actionTypes.DO_RESET_STATUS :
      return Object.assign( {}, state, { 
        resetPassStatus: action.resetPassStatus, 
      });

    case actionTypes.CHANGE_LOADING_STATUS_PINCODE :
      return Object.assign( {}, state, { 
        status_pincode: action.status_pincode, 
    });
    
    case actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE :
      return Object.assign( {}, state, { 
        status_update_pincode: action.status_update_pincode, 
    });
     
    default:
      return state;
  }
}

export default reducer;
