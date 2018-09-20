import { put } from 'redux-saga/effects'

import PostsActions from "../redux/PostRedux"
/**
 * TODO:create function where you can call it and pass args to fetch api with axios
 */
export function* startup () {
  /**
   * TODO: check if the user logged in or not and check for session logged in user
   */
  yield put(PostsActions.fetchPostsStart())
}
