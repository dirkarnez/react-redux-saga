import { takeEvery, delay} from 'redux-saga'
import { call, all, put, select, race, fork, take  } from 'redux-saga/effects'
import { HTTP_TIMEOUT } from './appConfig';
import { setInterval } from 'core-js/library/web/timers';

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
//resolve will be assigned somewhere
export const mydelay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* watchGenericHTTP() {
  yield* takeEvery('MY_HTTP', fetchUser);
}

export function* watchEveryThing() {
  yield* takeEvery('*', function* (action) {
    const state = yield select();
    console.log(`${action.type} is logged!`);
    console.log('state after', state)
  });
}

function* fetchUser(action) {
    console.log(`${action.type} is being listened!`);
    yield race([
      call(fetchResource, 'https://jsonplaceholder.typicode.com/photos'),
      call(delay, HTTP_TIMEOUT),
      take('DECREMENT')
    ])
    console.log ("End");
}

function* fetchResource(url) {
  const { response , error }  = yield call(callApi, url);
  if (response ) {
    console.log("P");
    yield put({ type: 'INCREMENT', result: response });
  } else if (error) { 
    console.log("E");
  }
}

export function callApi(url) {
    return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

function* rootSaga() {
  yield all([
    watchGenericHTTP(),
    watchEveryThing()
  ])
}

export default rootSaga;