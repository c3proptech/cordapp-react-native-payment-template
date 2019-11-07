export const actionTypes = {
  DO_TRADE : 'DO_TRADE',
  BROKER_FETCH_DATA : 'BROKER_FETCH_DATA',
  UPDATE_BROKER_DATA : 'UPDATE_BROKER_DATA',
  GET_TIME_SERVER : 'GET_BROKER_DATA',
  UPDATE_TIME_SERVER : 'UPDATE_TIME_SERVER',
  STATUS_TRANSACTION : 'STATUS_TRANSACTION',
};

export function _doTrade (data, isLoading = true) {
  return {
    type: actionTypes.DO_TRADE,
    data: data,
    isLoading: isLoading
  };
}

export function _brokerFetchData (data, isLoading = true) {
  return {
    type: actionTypes.BROKER_FETCH_DATA,
    data: data,
    isLoading: isLoading
  };
}

export function _updateBrokerData (data) {
  return {
    type: actionTypes.UPDATE_BROKER_DATA,
    data: data
    };
};
export function _getTimeServer () {
  return {
    type: actionTypes.GET_TIME_SERVER,
   };
};
export function _updateTimeServer (data) {
  return {
    type: actionTypes.UPDATE_TIME_SERVER,
    data: data
   };
};
export function _clearStatusTransation (data) {
  return {
    type: actionTypes.STATUS_TRANSACTION,
    data: data
   };
};
