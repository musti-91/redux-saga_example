import { put, call } from 'redux-saga/effects'

import { fetchPosts } from '../PostsSaga'

import Actions, { fetchPostsSuccess } from '../../redux/PostRedux'

import { apiMock } from '../../config/setupTest'

import * as getData from '../getData'

jest.mock('../getData')

describe("PostsSaga", () => {
  getData.getPosts = jest.fn(() => 'request')
  const stepper = fn => mock => fn.next(mock).value

  // fetching
  describe("fetching", () => {
    it('fetching - request', () => {
      const step = stepper(fetchPosts())

      expect(step()).toEqual(call(getData.getPosts))
    })
  })
})