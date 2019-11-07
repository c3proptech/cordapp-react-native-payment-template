import I18n from 'react-native-i18n';

import { actionTypes } from './../actions/user';

const initialState = {
  data: [],
  isLogout:false,
  isLogin: false,
  session: [],
  resetPassStatus: false,
  loginStatus: false
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {

    case actionTypes.USER_DATA:
      console.log('1111111111111111');
      return Object.assign({}, state, {
        data: action.data
      });

    case actionTypes.LOG_IN :
      return Object.assign({}, state, {
        isLogout: action.isLogout,
        isLogin: action.isLogin,
        session: action.session
      });
    case actionTypes.DO_LOGOUT_DEMO :
      return Object.assign( {}, state, { 
        session: {key: ''}, 
      });
    case actionTypes.CHANGE_IS_ACTIVE_PASS_CODE :
      return {
        ...state,
        data  : {
          ...state.data,
          IsActivePassCode : action.active
        },
        
      };
    default:
      return state;
  }
}

export default reducer;
