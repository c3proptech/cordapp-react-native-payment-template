import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import combineReducers from './reducers';
import rootSaga from './sagas';

const logger = createLogger({});

const sagaMiddleware = createSagaMiddleware();
const middleWare = [thunk, sagaMiddleware, logger];
//const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export const store = createStore(
  combineReducers,
  compose(
    applyMiddleware(...middleWare),
    autoRehydrate()
  )
);
sagaMiddleware.run(rootSaga);
export const configureStore = (onComplete) => {
  	//const store = autoRehydrate()(createStoreWithMiddleware)(combineReducers);
  	persistStore(store, { storage: AsyncStorage }, onComplete);
  	return store;
};
