import I18n from 'react-native-i18n';

import { actionTypes } from './../actions/wallet';

const initialState = {
  list: {
    rows: [],
    pages: '',
    sum: {
      total_usd: 0.0
    }
  },
  transactions: {
    rows: [],
    pages: '',
    sum: []
  },
  deposit_address: {
    address: ''
  },
  selected: [],
  send_status: {
    status: 0,
    msg: 'OK'
  },
  history: {}
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {

    case actionTypes.WALLET_LIST:
      return Object.assign({}, state, {
        data: action.data
      });

    case actionTypes.SET_WALLET_LIST:
      return Object.assign({}, state, {
        list:{
          rows: action.rows,
          pages: action.pages,
          sum: action.sum
        }
      });

    case actionTypes.SET_WALLET_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions:{
          rows: action.rows,
          pages: action.pages,
          sum: action.sum
        }
      });

    case actionTypes.RESET_WALLET_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions:{
          rows: [],
          pages: 0,
          sum: []
        }
      });

    case actionTypes.SET_WALLET_DEPOSIT_ADDRESS:
      return Object.assign({}, state, {
        deposit_address: action.data
      });

    case actionTypes.SET_WALLET_SELECTED:
      return Object.assign({}, state, {
        selected: action.data
      });

    case actionTypes.SEND_TRANSACTION_STATUS:
      return Object.assign({}, state, {
        send_status: {
          status: action.status,
          msg: action.msg
        }
      });

    case actionTypes.RESET_WALLET_DEPOSIT_ADDRESS:
      return Object.assign({}, state, {
        deposit_address: {}
      });

    default:
      return state;
  }
}

export default reducer;
