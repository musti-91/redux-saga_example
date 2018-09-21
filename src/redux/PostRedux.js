import { createActions, createReducer } from 'reduxsauce'
import Immuteable from 'seamless-immutable'
import { updateItem } from '../utils/reduxHelper'

const { Types, Creators } = createActions({
  // fetching
  fetchPostsStart: null,
  fetchPostsSuccess: ['posts'],
  fetchPostsFailure: ['error'],
  resetFetchPostsError: null,
  // add post
  addPost: null,
  addPostSuccess: ["newPost"],
  addPostFailure: ["error"],
  resetAddPostError: null,
  // update Post
  updatePost: null,
  updatePostSuccess: ['id', 'updatedPost'],
  updatePostFailure: ["error"],
  resetUpdatePostError: null,
  // Delete Post
  deletePost: null,
  deletePostSuccess: ['id'],
  deletePostFailure: ['error'],
  resetDeletePostError: null,
})

export const PostTypes = Types
export default Creators

// INITIAL_STATE
export const INITIAL_STATE = Immuteable({
  posts: [],
  fetchPostsError: null,
  busyFetchingPosts: false,
  // add Post
  newPost: null,
  busyAddPost: false,
  addPostError: null,
  // update
  busyUpdatingPost: false,
  updatePostError: null,
  // delete
  busyDeletingPost: false,
  deletedPostId: null,
  deletePostError: null,
})

/** ------------- Actions  ------------- */
/** ********* fetching  ********* */
export const fetchPostsStart = state => state.merge({
  busyFetchingPosts: true,
  posts: []
})
export const fetchPostsSuccess = (state, { posts }) => state.merge({
  posts,
  busyFetchingPosts: false
})
export const fetchPostsFailure = (state, { error }) => state.merge({
  busyFetchingPosts: false,
  fetchPostsError: error
})
export const resetFetchPostsError = state => state.merge({ fetchPostsError: null })

/** ********* add  ********* */
export const addPost = state => state.merge({
  busyAddPost: true,
  newPost: null
})
export const addPostSuccess = (state, { newPost }) => state.merge({
  newPost,
  posts: [...state.posts, newPost],
  busyAddPost: false
})
export const addPostFailure = (state, { error }) => state.merge({
  addPostError: error,
  busyAddPost: false,
  newPost: null
})
export const resetAddPostError = state => state.merge({ addPostError: null })

/** ********* update  ********* */
export const updatePost = state => state.merge({ busyUpdatingPost: true })
export const updatePostSuccess = (state, { id, updatedPost }) => state.merge({
  busyUpdatingPost: false,
  posts: [updateItem(id, state.posts, updatedPost)],
  updatePostError: null
})
export const updatePostFailure = (state, { error }) => state.merge({
  updatePostError: error,
  updatedPost: false,
})
export const resetUpdatePostError = state => state.merge({ updatePostError: null })

/** ********* DELETE POST  ********* */

export const deletePost = state => state.merge({ busyDeletingPost: true })
export const deletePostSuccess = (state, { id }) => state.merge({
  busyDeletingPost: false,
  posts: [...state.posts, state.posts.filter(post => post.id !== id)],
  deletePostError: null,
  deletedPostId: id
})
export const deletePostFailure = (state, { error }) => state.merge({
  deletePostError: error,
  deletedPostId: null
})
export const resetDeletePostError = state => state.merge({ deletePostError: null })

// reducer
export const reducer = createReducer(INITIAL_STATE, {
  // fetching posts types
  [Types.FETCH_POSTS_START]: fetchPostsStart,
  [Types.FETCH_POSTS_SUCCESS]: fetchPostsSuccess,
  [Types.FETCH_POSTS_FAILURE]: fetchPostsFailure,
  [Types.RESET_FETCH_POSTS_ERROR]: resetFetchPostsError,
  // add post types
  [Types.ADD_POST]: addPost,
  [Types.ADD_POST_SUCCESS]: addPostSuccess,
  [Types.ADD_POST_FAILURE]: addPostFailure,
  [Types.RESET_ADD_POST_ERROR]: resetAddPostError,
  // update
  [Types.UPDATE_POST]: updatePost,
  [Types.UPDATE_POST_SUCCESS]: updatePostSuccess,
  [Types.UPDATE_POST_FAILURE]: updatePostFailure,
  [Types.RESET_UPDATE_POST_ERROR]: resetUpdatePostError,
  // delete
  [Types.DELETE_POST]: deletePost,
  [Types.DELETE_POST_SUCCESS]: deletePostSuccess,
  [Types.DELETE_POST_FAILURE]: deletePostFailure,
  [Types.RESET_DELETE_POST_ERROR]: resetDeletePostError,
})
