import { all, takeLatest, takeEvery } from 'redux-saga/effects'



/**          Types          */
import { PostTypes } from '../redux/PostRedux'
import { StartupTypes } from '../redux/StartupRedux'

/**        actions         */
import { fetchPosts } from './PostsSaga'
import { startup } from './StartupSaga';


export default (() => {
  return function* root () {
    yield all([
      takeEvery(StartupTypes.STARTUP, startup),
      takeEvery(PostTypes.FETCH_POSTS_START, fetchPosts),
    ])
  }
})()