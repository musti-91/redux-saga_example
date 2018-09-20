import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import { getPosts } from './getData'
import addTitleError from '../utils/errorHelper'

import PostsActions from '../redux/PostRedux'

export function* fetchPosts () {
  // call api first that's wil trigger fetchPostStart action
  const { data } = yield call(getPosts)
  // check respond of api
  if (data) {
    yield put(PostsActions.fetchPostsSuccess(data))
  } else {
    const error = addTitleError(data, 'Loading Posts failed!')
    yield put(PostsActions.fetchPostsFailure(error))
  }
}