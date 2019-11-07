import I18n from 'react-native-i18n';

import { actionTypes } from './../actions/basic';

const initialState = {
  url: '',
  userid: '',
  password: '',
  auto_login: false,
  appType: '',
  cookie: '',
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case actionTypes.CHANGE_BASIC_DATA:
      return Object.assign({}, state, {
        url: action.basic.url,
        userid: action.basic.userid,
        password: action.basic.password,
        cookie: action.basic.cookie,
        appType: action.basic.appType,
        
      });

    case actionTypes.CHANGE_AUTO_LOGIN:
      return Object.assign({}, state, {
        auto_login: action.auto_login
      });
    case actionTypes.UPDATE_TOKEN_DEVICE:
      return Object.assign({}, state, {
        token: action.token
      });

    case actionTypes.UPDATE_APP_TYPE :
      return Object.assign( {}, state, { 
        appType: action.appType, 
      });

    default:
      return state;
  }
}

export default reducer;