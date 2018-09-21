import { call, put } from 'redux-saga/effects'

import addTitleError from '../utils/errorHelper'

import FilterActions from '../redux/FilterRedux'

/** ********* Filter posts by  user ***********  */
export function* filterPosts (api, actions) {
  const { id } = actions
  const { data } = yield call(api.getPostsOfUser, id)

  if (Array.isArray(data)) {
    yield put(FilterActions.filterPostsSuccess(data))
  } else {
    const error = addTitleError(data, 'Filtering posts failed!')
    yield put(FilterActions.filterPostsFailure(error))
  }
}

/** ********* Filter comments by post ***********  */

export function* filterComments (api, actions) {
  const { id } = actions
  const { data } = yield call(api.getCommentsOfPosts, id)

  if (Array.isArray(data)) {
    yield put(FilterActions.filterCommentsSuccess(data))
  } else {
    const error = addTitleError(data, 'Filtering comments failed!')
    yield put(FilterActions.filterCommentsFailure(error))
  }
}