import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import myRootSaga from './myRootSaga'

const sagaMiddleware = createSagaMiddleware(); 

export default createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(myRootSaga);