import Actions, { INITIAL_STATE, reducer } from '../PostRedux'
import * as helper from '../../utils/reduxHelper'


jest.mock('../../utils/reduxHelper')
describe("PostRedux", () => {
  describe('fetching posts', () => {
    it('fetching - request', () => {
      const state = reducer(INITIAL_STATE, Actions.fetchPostsStart())

      expect(state.busyFetchingPosts).toEqual(true)
      expect(state.posts).toEqual([])
    })

    it("fetching - success", () => {
      const posts = [{ id: 2, title: "something", }, { id: 3, title: "something else" }]
      const state = reducer(INITIAL_STATE, Actions.fetchPostsSuccess(posts))

      expect(state.busyFetchingPosts).toBeFalsy()
      expect(state.posts).toEqual(posts)
    })

    it('fetching - failure', () => {
      const error = { message: 'error' }
      const state = reducer(INITIAL_STATE, Actions.fetchPostsFailure(error))

      expect(state.busyFetchingPosts).toBeFalsy()
      expect(state.fetchPostsError).toEqual(error)
    })

    it('fetching - reset error', () => {
      const state = reducer(INITIAL_STATE, Actions.resetFetchPostsError())

      expect(state.fetchPostsError).toBeNull()
    })
  })
  // add post 
  describe('addPost', () => {
    it('AddPost', () => {
      const state = reducer(INITIAL_STATE, Actions.addPost())

      expect(state.busyAddPost).toBeTruthy()
      expect(state.newPost).toBeNull()
    })

    it('addPost -success', () => {
      const post = { id: 2, title: "something" }
      const state = reducer(INITIAL_STATE, Actions.addPostSuccess(post))

      expect(state.newPost).toEqual(post)
      expect(state.busyAddPost).toBeFalsy()
    })

    it('addPost-failure', () => {
      const error = { message: "error" }
      const state = reducer(INITIAL_STATE, Actions.addPostFailure(error))

      expect(state.addPostError).toEqual(error)
      expect(state.busyAddPost).toBeFalsy()
      expect(state.newPost).toBeNull()
    })

    it("addPost- resetAddPostError", () => {
      const state = reducer(INITIAL_STATE, Actions.resetAddPostError())

      expect(state.addPostError).toBeNull()
    })
  })
  describe('UPDATE POST', () => {
    it('update Post', () => {
      const state = reducer(INITIAL_STATE, Actions.updatePost())

      expect(state.busyUpdatingPost).toBeTruthy()
    })

    it('update post success', () => {
      const updatedPost = { title: "something" }
      const state = reducer(INITIAL_STATE, Actions.updatePostSuccess(1, updatedPost))

      expect(state.busyUpdatingPost).toBeFalsy()
      expect(state.updatePostError).toBeNull()
    })

    it('upadte post failure', () => {
      const updatePost = { title: "something" }
      const error = { message: "error" }
      const state = reducer(INITIAL_STATE, Actions.updatePostFailure(error))

      expect(state.updatePostError).toEqual(error)
      expect(state.updatedPost).toBeFalsy()
    })

    it('updatePost, resetError', () => {
      const state = reducer(INITIAL_STATE, Actions.resetUpdatePostError())

      expect(state.updatePostError).toBeNull()
    })
  })

  describe('DELETE POST', () => {
    it('delete post', () => {
      const state = reducer(INITIAL_STATE, Actions.deletePost())

      expect(state.busyDeletingPost).toBeTruthy()
    })

    it('delete post - success', () => {
      const post = { id: 3 }
      const state = reducer(INITIAL_STATE, Actions.deletePostSuccess(post.id))

      expect(state.deletedPostId).toEqual(post.id)
      expect(state.busyDeletingPost).toBeFalsy()
      expect(state.deletePostError).toBeNull()
    })

    it('delete post -failure', () => {
      const error = { message: "error" }
      const state = reducer(INITIAL_STATE, Actions.deletePostFailure(error))

      expect(state.deletedPostId).toBeNull()
      expect(state.deletePostError).toEqual(error)
    })
  })
})