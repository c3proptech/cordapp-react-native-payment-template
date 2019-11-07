import { combineReducers } from 'redux';
import User from './user';
import Common from './common';
import Basic from './basic';
import Trade from './trade';
import Wallet from './wallet';

const appReducer = combineReducers({
	common  : Common,
  user    : User,
  basic    : Basic,
  trade    : Trade,
  wallet  : Wallet,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
	const oldState = state;
	  //console.log('rootReducer', action);
  	if (action.type === 'LOG_OUT') {
    	state = initialState
  	}

    if (action.type == 'persist/REHYDRATE') {
      if (typeof action.payload.common != 'undefined' && typeof action.payload.common.loading != 'undefined')
        action.payload.common.loading = false;

      if(action.payload && action.payload.basic && action.payload.basic.auto_login == false && action.payload.basic.cookie){
        //state = initialState;
      }
    }
    
  	if (typeof oldState != 'undefined' && typeof oldState.basic != 'undefined') {
  		state.basic = oldState.basic;
      if (state.basic.auto_login == false ){
          state.basic.password = '';
          state.common.isLogin = false;;
      } 
      state.common.language = oldState.common.language;
  	}
    
  	return appReducer(state, action);
};

export default rootReducer;
