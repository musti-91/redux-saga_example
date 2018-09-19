import { call, put } from 'enzyme'


import TodoActions from '../../redux/TodoRedux'

import { apiMock } from '../../config/setupTest'
import fetchTodosStart from '../TodoSaga'

import * as saga from '../TodoSaga'

jest.mock('../TodoSaga')

describe('todo-saga', () => {
  const stepper = fn => mock => fn.next(mock).value
  saga.apiCall = jest.fn()
  // request
  describe("fetch todos", () => {
    it("request", () => {
      const step = stepper(fetchTodosStart())
    })
  })
})
