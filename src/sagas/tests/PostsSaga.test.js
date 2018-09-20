import { put, call } from 'redux-saga/effects'

import { fetchPosts } from '../PostsSaga'

import Actions, { fetchPostsSuccess, fetchPostsFailure } from '../../redux/PostRedux'

import { apiMock } from '../../config/setupTest'

import * as api from '../../config/applicationConfig'
import addTitleError from '../../utils/errorHelper';

jest.mock('../../config/applicationConfig')

describe("PostsSaga", () => {
  api.getPosts = jest.fn(() => 'request')
  const stepper = fn => mock => fn.next(mock).value

  // fetching
  describe("fetching", () => {
    it('fetching - request', () => {
      const step = stepper(fetchPosts(api.getPosts))

      expect(step()).toEqual(call(api.getPosts))
    })

    it('fetching - success', () => {
      const posts = [{ id: 2, title: "something" }, { id: 3, title: "something else" }]
      const step = stepper(fetchPosts(api.getPosts))
      const response = { data: posts }
      step()
      expect(step(response)).toEqual(put(Actions.fetchPostsSuccess(posts)))
    })

    it('fetching - failure', () => {
      const response = { data: { error: 404, subError: 0, message: "error message" } }
      const step = stepper(fetchPosts(api.getPosts))
      step()
      const errorObj = addTitleError(response.data, "Loading Posts failed!")
      expect(step(response)).toEqual(put(Actions.fetchPostsFailure(errorObj)))
    })
  })
})