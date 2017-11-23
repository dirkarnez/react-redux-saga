import { takeEvery } from 'redux-saga'
import { call, all, put } from 'redux-saga/effects'

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
//resolve will be assigned somewhere
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync);
}

/******************************** */
export function* watchGenericHTTP() {
  yield* takeEvery('MY_HTTP', fetchUser);
}

function* fetchUser(action) {
  console.log(`${action.type} is being listened!`);
  yield* callApi( 
    'https://jsonplaceholder.typicode.com/posts/1',
    null);
}

export function* callApi(
  url,
  config,
  onRequestSuccess,
  onRequestFailure
) {
  try {
    const ret = yield call(fetch, url)
    console.log(ret);
    yield put({ type: 'INCREMENT', result: ret })
  } catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}

function* checkStatus(response) {
  console.log("checkStatus")
  if (!response.ok) {
    // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  yield response;
}

function* parseJSON(response) {
  console.log("parseJSON")
  yield response.json();
}


/******************************** */

function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchGenericHTTP()
  ])
}

export default rootSaga;