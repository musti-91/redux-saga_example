
export function* fetchContext (api) {

  /** start fetching application  */
  const { ok, data } = yield call(api, header)

  if (ok) {
    yield put(SetActions.fetchPostsSuccess(data))
  } else {
    const error = addTitleError(data, 'Loading POSTS failed')
    yield put(SetActions.fetchPostsFailure(error))
  }
}