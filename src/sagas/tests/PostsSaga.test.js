import { put, call } from 'redux-saga/effects'

import { fetchPosts, addPost, updatePost, deletePost } from '../PostsSaga'

import Actions, { fetchPostsSuccess, fetchPostsFailure } from '../../redux/PostRedux'

import { apiMock } from '../../config/setupTest'

import { api } from '../../config/applicationConfig'
import addTitleError from '../../utils/errorHelper'

jest.mock('../../config/applicationConfig')

describe("PostsSaga", () => {

  const stepper = fn => mock => fn.next(mock).value
  // fetching
  describe("FETCHING", () => {
    it('fetching - request', () => {
      const step = stepper(fetchPosts(api))

      expect(step()).toEqual(call(api.get))
    })

    it('fetching - success', () => {
      const posts = [{ id: 2, title: "something" }, { id: 3, title: "something else" }]
      const step = stepper(fetchPosts(api))
      const response = { data: posts }
      step()
      expect(step(response)).toEqual(put(Actions.fetchPostsSuccess(posts)))
    })

    it('fetching - failure', () => {
      const response = { data: { error: 404, subError: 0, message: "error message" } }
      const step = stepper(fetchPosts(api))
      step()
      const errorObj = addTitleError(response.data, "Loading Posts failed!")
      expect(step(response)).toEqual(put(Actions.fetchPostsFailure(errorObj)))
    })
  })
  describe('addPost', () => {
    const parameters = {
      post: {
        title: 'foo',
        body: 'bar',
        userId: 1
      }
    }
    it('request', () => {
      const step = stepper(addPost(api, parameters))

      expect(step()).toEqual(call(api.post, parameters.post))
    })

    it('addPost - success', () => {
      const step = stepper(addPost(api, parameters))
      const response = {
        data: parameters.post
      }
      // first step
      step()

      expect(step(response)).toEqual(put(Actions.addPostSuccess(parameters.post)))
    })

    it("ADD POST - failure", () => {
      const step = stepper(addPost(api, parameters))
      const response = {
        data: { message: "something went wrong with the request" }
      }
      const error = addTitleError(response.data, "Adding post is failed!")

      // first step
      step()

      expect(step(response)).toEqual(put(Actions.addPostFailure(error)))
    })
  })

  // update
  describe('UPDATE POST', () => {
    const parameters = {
      updatedPost: {
        title: 'testing',
        body: ' testing_body',
        userId: 2
      },
      id: 2
    }
    it('request', () => {
      const step = stepper(updatePost(api, parameters))

      expect(step()).toEqual(call(api.put, parameters.id, parameters.updatedPost))
    })

    it('updatePost - success', () => {
      const step = stepper(updatePost(api, parameters))
      // skip first step
      const { id, updatedPost } = parameters
      const data = {
        title: 'testing',
        body: ' testing_body',
        userId: 2
      }
      step()

      expect(step(data)).toEqual(put(Actions.updatePostSuccess(id, updatedPost)))
    })

    it('updatePost - Failure', () => {
      const step = stepper(updatePost(api, parameters))
      // skip first step

      const { id, updatedPost } = parameters
      const data = {
        not: 'testing',
        body: ' testing_body',
        userId: 2
      }
      const error = addTitleError(data, "Edit post is failed!")
      step()

      expect(step(data)).toEqual(put(Actions.updatePostFailure(error)))
    })
  })

  describe("DELETE POST", () => {
    const actions = { id: 2 }
    it('request', () => {
      const step = stepper(deletePost(api, actions))

      expect(step()).toEqual(call(api.delete, 2))
    })

    it('delete post - success', () => {
      const step = stepper(deletePost(api, actions))
      step()
      const data = {}

      expect(step({ data })).toEqual(put(Actions.deletePostSuccess(2)))
    })

    it('delete post -failure', () => {
      const data = ""
      const error = addTitleError(data, 'Deleting post failed!')
      const step = stepper(deletePost(api, actions))
      step()

      expect(step({ data })).toEqual(put(Actions.deletePostFailure(error)))
    })
  })
})