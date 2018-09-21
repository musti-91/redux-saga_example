import { call, put } from 'redux-saga/effects'

import addTitleError from '../utils/errorHelper'

import PostsActions from '../redux/PostRedux'
// TODO: CHANGED API CONFIG
// FETCH POSTS
export function* fetchPosts (api) {
  // call api first that's wil trigger fetchPostStart action
  const { data } = yield call(api.get)
  // check respond of api as array specific for this (jsonplaceholder) api
  if (Array.isArray(data)) {
    yield put(PostsActions.fetchPostsSuccess(data))
  } else {
    const error = addTitleError(data, 'Loading Posts failed!')
    yield put(PostsActions.fetchPostsFailure(error))
  }
}
// ADD POST
export function* addPost (api, actions) {
  const { post } = actions
  const { data } = yield call(api.post, post)
  if (data.title) {
    yield put(PostsActions.addPostSuccess(post))
  } else {
    const error = addTitleError(data, `Adding post is failed!`)
    yield put(PostsActions.addPostFailure(error))
  }
}

// UPDATE POST
export function* updatePost (api, actions) {
  const { id, updatedPost } = actions
  const data = yield call(api.put, id, updatedPost)
  if (data.title) {
    yield put(PostsActions.updatePostSuccess(id, updatedPost))
  } else {
    const error = addTitleError(data, "Edit post is failed!")
    yield put(PostsActions.updatePostFailure(error))
  }
}

//DELETE POST
export function* deletePost (api, actions) {
  const { id } = actions
  const { data } = yield call(api.delete, id)
  if (data) {
    yield put(PostsActions.deletePostSuccess(id))
  } else {
    const error = addTitleError(data, 'Deleting post failed!')
    yield put(PostsActions.deletePostFailure(error))
  }
}
