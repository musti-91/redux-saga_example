import Actions, { INITIAL_STATE, reducer } from '../PostRedux'

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
})