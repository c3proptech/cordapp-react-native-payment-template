export const actionTypes = {
  LOG_OUT : 'LOG_OUT',
  LOG_IN  : 'LOG_IN',
  USER_DATA : 'USER_DATA',
  DO_LOGIN: 'DO_LOGIN',
  DO_LOGIN_STATUS: 'DO_LOGIN_STATUS',
  DO_LOGOUT: 'DO_LOGOUT',
  DO_RESET: 'DO_RESET',
  DO_RESET_STATUS: 'DO_RESET_STATUS',
  CHANGE_IS_ACTIVE_PASS_CODE : 'CHANGE_IS_ACTIVE_PASS_CODE',
};

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

export function _updateUserData (user) {
  return {
    type: actionTypes.USER_DATA,
    data: user
  };
}

export function _doLogIn (data) {
  return {
    type: actionTypes.DO_LOGIN,
    data: data
  };
}
export function _doLogOut () {
  return {
    type: actionTypes.DO_LOGOUT,
  };
}
export function _updateIsActivePassCode (data) {
  return {
    type: actionTypes.CHANGE_IS_ACTIVE_PASS_CODE,
    active : data.active
  };
}
