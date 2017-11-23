import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { helloSaga, watchIncrementAsync } from './mySaga'

const sagaMiddleware = createSagaMiddleware(); 

export default createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchIncrementAsync);
sagaMiddleware.run(helloSaga);