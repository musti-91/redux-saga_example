import { call, put } from 'enzyme'

import fetchTodosStart from '../../sagas/TodoSaga'

import Actions from '../../redux/TodoRedux'

import { apiMock } from '../../config/setupTest'

describe('todo-saga', () => {
  const stepper = fn => mock => fn.next(mock).value
  it("request accept disclaimer", () => {
    const step = stepper(fetchTodosStart(apiMock))
    expect(step()).toEqual(call(apiMock.get))
  })
})