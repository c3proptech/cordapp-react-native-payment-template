export const actionTypes = {
  LOG_OUT : 'LOG_OUT',
  LOG_IN  : 'LOG_IN',
  CHANGE_CONNECTION_STATUS  : 'CHANGE_CONNECTION_STATUS',
  CHANGE_ERROR_NETWORK_STATUS : 'CHANGE_ERROR_NETWORK_STATUS',
  CHANGE_ISFRESHING_STATUS : 'CHANGE_ISFRESHING_STATUS',
  CHANGE_LANGUAGE : 'CHANGE_LANGUAGE',
  CHANGE_LOADING_STATUS: 'CHANGE_LOADING_STATUS',
  CHANGE_LOADING_STATUS_PINCODE: 'CHANGE_LOADING_STATUS_PINCODE',
  CHANGE_LOADING_STATUS_UPDATE_PINCODE: 'CHANGE_LOADING_STATUS_UPDATE_PINCODE',
  DO_LOGIN: 'DO_LOGIN',
  DO_RESGITER: 'DO_RESGITER',
  DO_CHECK_PASS_CODE: 'DO_CHECK_PASS_CODE',
  DO_PASSCODE: 'DO_PASSCODE',
  DO_LOGIN_STATUS: 'DO_LOGIN_STATUS',
  DO_LOGOUT: 'DO_LOGOUT',
  DO_RESET: 'DO_RESET',
  DO_RESET_STATUS: 'DO_RESET_STATUS',
  CHANGE_API_LOADING_STATUS : 'CHANGE_API_LOADING_STATUS',
  DO_CHANGE_API_LOADING_STATUS : 'DO_CHANGE_API_LOADING_STATUS',
}
export function logOut() {
  return {
    type: actionTypes.LOG_OUT,
    isLogout: true,
    isLogin: false,
  };
}

export const logIn = (session) => {
  return {
    type: actionTypes.LOG_IN,
    isLogout: false,
    isLogin: true,
    session: session
  };
};

export const connectionState = ({ status }) => {
  return { 
    type: actionTypes.CHANGE_CONNECTION_STATUS, 
    isConnected: status 
  };
};

export const changeErrorNetwork = (status) => {
  return { 
    type: actionTypes.CHANGE_ERROR_NETWORK_STATUS, 
    errorNetwork: status 
  };
};

export const changeIsRefreshingStatus = (status) => {
  return { 
    type: actionTypes.CHANGE_ISFRESHING_STATUS, 
    isRefreshing: status 
  };
};

export function updateLanguage(language: string) {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language: language,
  };
}

export function changeLoadingStatus(loading, changeLanguage = false) {
  return {
    type: actionTypes.CHANGE_LOADING_STATUS,
    loading: loading,
    //changeLanguage: changeLanguage
  };
}

export function _changeApiLoadingStatus(status) {
  return {
    type: actionTypes.DO_CHANGE_API_LOADING_STATUS,
    apiWating: status
  };
}

export function _changeLoadingStatusPinCode(status) {
  return {
    type: actionTypes.CHANGE_LOADING_STATUS_PINCODE,
    status_pincode: status
  };
}

export function _changeLoadingStatusUpdatePinCode(status) {
  return {
    type: actionTypes.CHANGE_LOADING_STATUS_UPDATE_PINCODE,
    status_update_pincode: status
  };
}

export function _doLogIn (data) {
  return {
    type: actionTypes.DO_LOGIN,
    baseURL: data.baseURL,
    data: data.data
  };
}

export function _doRegister (data) {
  return {
    type: actionTypes.DO_RESGITER,
    data: data
  };
}

export function _doLogOut () {
  return {
    type: actionTypes.DO_LOGOUT
  };
}

export function _doCheckPinCode (data) {
  return {
    type: actionTypes.DO_CHECK_PASS_CODE,
    data: data
  };
}

export function _doPassCode (data) {
  return {
    type: actionTypes.DO_PASSCODE,
    data: data
  };
}

export function _doResetPass (baseURL, data) {
  return {
    type: actionTypes.DO_RESET,
    baseURL: baseURL,
    data: data
  };
}


