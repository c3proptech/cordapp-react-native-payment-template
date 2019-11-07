import I18n from 'react-native-i18n';
import { js_yyyy_mm_dd_hh_mm_ss } from 'payment/configs';
import { actionTypes } from './../actions/trade';

const initialState = {
  broker: {
    row : {},
    report : {},
  },
  report : {},
  time_server : js_yyyy_mm_dd_hh_mm_ss(),
  status_transation : {
    state : false,
    msg : ''
  }
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case actionTypes.UPDATE_BROKER_DATA:
      return Object.assign({}, state, {
        broker: action.data
      });
    case actionTypes.UPDATE_TIME_SERVER:
      return Object.assign({}, state, {
        time_server: action.data
      });
    case actionTypes.STATUS_TRANSACTION:
      return Object.assign({}, state, {
        status_transation: action.data
      });
    // case actionTypes.LOG_IN :
    //   return Object.assign({}, state, {
    //     isLogout: action.isLogout,
    //     isLogin: action.isLogin,
    //     session: action.session
    //   });
    // case actionTypes.DO_LOGOUT_DEMO :
    //   return Object.assign( {}, state, { 
    //     session: {key: ''}, 
    //   });
    default:
      return state;
  }
}

export default reducer;
