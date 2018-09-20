import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import addTitleError from '../utils/errorHelper'

import PostsActions from '../redux/PostRedux'
// TODO: CHANGED API CONFIG
export function* fetchPosts (api) {
  // call api first that's wil trigger fetchPostStart action
  const { data } = yield call(api)
  // check respond of api as array specific for this jsonplaceholder api
  if (Array.isArray(data)) {
    yield put(PostsActions.fetchPostsSuccess(data))
  } else {
    const error = addTitleError(data, 'Loading Posts failed!')
    yield put(PostsActions.fetchPostsFailure(error))
  }
}