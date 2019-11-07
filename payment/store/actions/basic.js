export const actionTypes = {
  CHANGE_BASIC_DATA : 'CHANGE_BASIC_DATA',
  CHANGE_AUTO_LOGIN: 'CHANGE_AUTO_LOGIN',
  UPDATE_APP_TYPE: 'UPDATE_APP_TYPE',
  UPDATE_TOKEN_DEVICE: 'UPDATE_TOKEN_DEVICE',
  CHANGE_STATUS_HAS_MAP : 'CHANGE_STATUS_HAS_MAP',
};

export function _updateBasicData (basic) {
  return {
    type: actionTypes.CHANGE_BASIC_DATA,
    basic: basic
  };
}
export function getToken (token) {
  return {
    type: actionTypes.UPDATE_TOKEN_DEVICE,
    token: token
  };
}
export function _changeAutoLogin (auto_login) {
  return {
    type: actionTypes.CHANGE_AUTO_LOGIN,
    auto_login: auto_login
  };
}


export function updateAppType (type) {
  return {
    type: actionTypes.UPDATE_APP_TYPE,
    appType: type
  };
}

export function _changeStatusDownloadMap (status) {
  return {
    type: actionTypes.CHANGE_STATUS_HAS_MAP,
    has_map: status
  };
}