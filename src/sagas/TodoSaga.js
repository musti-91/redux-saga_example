import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import TodoActions from '../redux/TodoRedux'


function apiCall() {
  return axios({
    method: 'get',
    url: 'http://jsonplaceholder.typicode.com/todos'
  })
}

// fetching 
export function* fetchTodosStart() {
  try {
    const response = yield call(apiCall)
    yield put(TodoActions.fetchTodosSuccess(response.data))
  } catch (error) {
    yield put(TodoActions.fetchTodosFailure(error))
  }
}

// add Todo
export function* addTodo(newTodo) {
  try{
    yield put(TodoActions.addTodoSuccess(newTodo))
  }
  catch(error) {
    yield put(TodoActions.addTodoFailure(error))
  }
}
// delete todo 

export function* deleteTodo(todoId) {
  try {
    yield put(TodoActions.deleteTodoSuccess(todoId))
  }
  catch (error) {
    yield put(TodoActions.deleteTodoError(error))
  }
}