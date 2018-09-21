import { combineReducers } from 'redux'
// reducers
import { reducer as postsReducer } from './PostRedux'
import { reducer as filterPostsReducer } from './FilterRedux'


import RootSaga from '../sagas'

import configureStore from "../redux/CreateStore"

export default (() => {
    const rootReducer = combineReducers({
        posts: postsReducer,
        filterPosts: filterPostsReducer
    })
    const rootSaga = RootSaga

    return configureStore(rootReducer, rootSaga)
})()