export const actionTypes = {
  GET_WALLET_LIST : 'GET_WALLET_LIST',
  SET_WALLET_LIST : 'SET_WALLET_LIST',
  GET_WALLET_DEPOSIT_ADDRESS: 'GET_WALLET_DEPOSIT_ADDRESS',
  SET_WALLET_DEPOSIT_ADDRESS: 'SET_WALLET_DEPOSIT_ADDRESS',
  RESET_WALLET_DEPOSIT_ADDRESS: 'RESET_WALLET_DEPOSIT_ADDRESS',
  GET_WALLET_TRANSACTIONS : 'GET_WALLET_TRANSACTIONS',
  SET_WALLET_TRANSACTIONS : 'SET_WALLET_TRANSACTIONS',
  RESET_WALLET_TRANSACTIONS: 'RESET_WALLET_TRANSACTIONS',
  SEND_TRANSACTION: 'SEND_TRANSACTION',
  SEND_TRANSACTION_STATUS: 'SEND_TRANSACTION_STATUS',
  GET_WALLET_SELECTED : 'GET_WALLET_SELECTED',
  SET_WALLET_SELECTED : 'SET_WALLET_SELECTED',
}

export function _doLogIn (data) {
  return {
    type: actionTypes.DO_LOGIN,
    data: data
  };
}

export function _getWalletList () {
  return {
    type: actionTypes.GET_WALLET_LIST,
  };
}

export function _getWalletDepositAddress (state) {
  return {
    type: actionTypes.GET_WALLET_DEPOSIT_ADDRESS,
    state: state
  };
}

export function _resetWalletDepositAddress () {
  return {
    type: actionTypes.RESET_WALLET_DEPOSIT_ADDRESS
  };
}

export function _getWalletTransactions (state) {
  return {
    type: actionTypes.GET_WALLET_TRANSACTIONS,
    state: state
  };
}

export function _resetWalletTransactions () {
  return {
    type: actionTypes.RESET_WALLET_TRANSACTIONS
  };
}

export function _doSend (data) {
  return {
    type: actionTypes.SEND_TRANSACTION,
    data: data
  };
}

export function _getWalletSelected (state) {
  return {
    type: actionTypes.GET_WALLET_SELECTED,
    state: state
  };
}

export function changeSendStatus(status, msg) {
  return {
    type: actionTypes.SEND_TRANSACTION_STATUS,
    status: status,
    msg: msg
  };
}