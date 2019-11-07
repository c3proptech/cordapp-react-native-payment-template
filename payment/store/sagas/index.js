import { fork, all } from 'redux-saga/effects';
import commonSaga 		from './common';
import userSaga 		from './user';
import tradeSaga 		from './trade';
import walletSaga 		from './wallet';

const root = function * root () {
  yield all([
    fork(commonSaga),
  	fork(userSaga),
  	fork(tradeSaga),
  	fork(walletSaga)
  ])
}

export default root