import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import UserActions from '../redux/UserRedux'



function apiCall() {
  return axios({
    method: 'get',
    url: 'http://jsonplaceholder.typicode.com/users'
  })
}

// fetching
export function* fetchUsersStart() {
  try {
    const response = yield call(apiCall);
    const data = response.data;
    yield put(UserActions.fetchUsersSuccess(data));
  }
  catch (error) {
    yield put(UserActions.fetchUsersFailure(error))
  }
}

// add users
export function* addUser(newUser) {
  try {
    yield put(UserActions.addUserSuccess(newUser));
  }
  catch (error) {
    yield put(UserActions.addUserError(error))
  }
}

// delete users
export function* deleteUser(id) {
  try {
    yield put(UserActions.deleteUserSuccess(id));
  }
  catch (error) {
    yield put(UserActions.deleteUserError(error))
  }
}