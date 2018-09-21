import Actions, { INITIAL_STATE, reducer } from '../FilterRedux'
import * as helper from '../../utils/reduxHelper'

jest.mock('../../utils/reduxHelper')

describe('FILTER REDUX', () => {
  describe('FILTER POSTS', () => {
    it('filter posts', () => {
      const state = reducer(INITIAL_STATE, Actions.filterPostsByUser())
      expect(state.busyFilteringPosts).toBeTruthy()
    })

    it('filter posts success', () => {
      const filteredPosts = [{}, {}]
      const state = reducer(INITIAL_STATE, Actions.filterPostsSuccess(2, filteredPosts))

      expect(state.filterPostId).toEqual(2)
      expect(state.busyFilteringPosts).toBeFalsy()
    })

    it('filter posts Failed', () => {
      const error = { message: "error" }
      const state = reducer(INITIAL_STATE, Actions.filterPostsFailure(error))

      expect(state.filterPostsError).toEqual(error)
      expect(state.filterPostId).toBeNull()
    })

    it('reset filter posts ERROR', () => {
      const state = reducer(INITIAL_STATE, Actions.resetFilterPostsError())

      expect(state.filterPostsError).toBeNull()
    })
  })
  // comments
  describe('FILTER COMMENTS', () => {
    it('filter comments', () => {
      const state = reducer(INITIAL_STATE, Actions.filterCommentsByPost())
      expect(state.busyFilteringComments).toBeTruthy()
    })

    it('filter posts success', () => {
      const filteredPosts = [{}, {}]
      const state = reducer(INITIAL_STATE, Actions.filterPostsSuccess(2, filteredPosts))

      expect(state.filterPostId).toEqual(2)
      expect(state.busyFilteringPosts).toBeFalsy()
    })

    it('filter posts Failed', () => {
      const error = { message: "error" }
      const state = reducer(INITIAL_STATE, Actions.filterPostsFailure(error))

      expect(state.filterPostsError).toEqual(error)
      expect(state.filterPostId).toBeNull()
    })

    it('reset filter posts ERROR', () => {
      const state = reducer(INITIAL_STATE, Actions.resetFilterPostsError())

      expect(state.filterPostsError).toBeNull()
    })
  })
})