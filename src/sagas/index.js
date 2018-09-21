import { all, takeEvery, takeLatest } from 'redux-saga/effects'



/**          Types          */
import { StartupTypes } from '../redux/StartupRedux'
import { PostTypes } from '../redux/PostRedux'
import { FilterTypes } from '../redux/FilterRedux'

/**        actions         */
import { fetchPosts, addPost, updatePost, deletePost } from './PostsSaga'
import { filterPosts } from './FilterSaga'
import { startup } from './StartupSaga'

/**     api       */
import { api } from '../config/applicationConfig'

export default (() => {
  return function* root () {
    yield all([
      takeEvery(StartupTypes.STARTUP, startup, api),
      takeEvery(PostTypes.FETCH_POSTS_START, fetchPosts, api),
      // add post
      takeLatest(PostTypes.ADD_POST, addPost, api),
      // edit post
      takeLatest(PostTypes.UPDATE_POST, updatePost, api),
      // Delete post
      takeLatest(PostTypes.DELETE_POST, deletePost, api),
      // filter posts
      takeLatest(FilterTypes.FILTER_POSTS_BY_USER, filterPosts, api)
    ])
  }
})()