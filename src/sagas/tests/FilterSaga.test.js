import { put, call } from 'redux-saga/effects'

import { filterPosts, filterComments } from '../FilterSaga'

import Actions, { filterPostsByUser, filterPostsFailure, filterPostsSuccess, resetFilterPostsError } from '../../redux/FilterRedux'

import { api } from '../../config/applicationConfig'
import addTitleError from '../../utils/errorHelper'

jest.mock('../../config/applicationConfig')
describe('FilterSaga', () => {
  const stepper = fn => mock => fn.next(mock).value
  describe('FILTER POSTS', () => {
    const actions = { id: 3 }
    it('request', () => {
      const step = stepper(filterPosts(api, actions))

      expect(step()).toEqual(call(api.getPostsOfUser, 3))
    })

    it('filtered success', () => {
      const posts = [{ userId: 2 }, { userId: 4 }, { userId: 3 }]
      const step = stepper(filterPosts(api, actions))
      const data = [{ userId: 2 }, { userId: 4 }, { userId: 3 }]
      step()

      expect(step({ data })).toEqual(put(Actions.filterPostsSuccess(posts)))
    })

    it('filtered posts -failure', () => {
      const step = stepper(filterPosts(api, actions))
      step()
      const data = {}
      const error = addTitleError(data, 'Filtering posts failed!')

      expect(step({ data })).toEqual(put(Actions.filterPostsFailure(error)))
    })
  })

  // filter comments 
  describe('FILTER COMMENTS', () => {
    const actions = { id: 3 }
    it('request', () => {
      const step = stepper(filterComments(api, actions))

      expect(step()).toEqual(call(api.getCommentsOfPosts, 3))
    })

    it('filtered success', () => {
      const posts = [{ userId: 2 }, { userId: 4 }, { userId: 3 }]
      const step = stepper(filterComments(api, actions))
      const data = [{ userId: 2 }, { userId: 4 }, { userId: 3 }]
      step()

      expect(step({ data })).toEqual(put(Actions.filterCommentsSuccess(posts)))
    })

    it('filtered posts -failure', () => {
      const step = stepper(filterComments(api, actions))
      step()
      const data = {}
      const error = addTitleError(data, 'Filtering comments failed!')

      expect(step({ data })).toEqual(put(Actions.filterCommentsFailure(error)))
    })
  })
})