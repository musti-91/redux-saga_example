import Immutbale from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

// Types and creators
const { Types, Creators } = createActions({
  // todos 
  fetchTodosStart: null,
  fetchTodosSuccess: ["todos"],
  fetchTodosFailure: ["error"],
  resetFetchingTodosError: null,
  // add todo
  addTodo: ["todo"],
  addTodoFailure: ["error"],
  resetAddTodoError: null,
  // delete Todo 
  deleteTodo: ['id'],
  deleteTodoFailure: ['error'],
  resetDeleteTodoError: null
})
export const TodosTypes = Types
export default Creators

// state
const INITIAL_STATE = Immutbale({
  fetching: false,
  todos: [],
  fetchTodosError: null,
  // add Todo
  newTodo: null,
  addTodoError: null,
  // delete todo 
  todoId: null,
  deleteTodoError: null
})

// actions 
export const fetchTodosStart = state => state.merge({
  fetching: true,
  todos: [],
  fetchTodosError: null
})
export const fetchTodosSuccess = (state, { todos }) => state.merge({
  fetching: false,
  todos,
  fetchTodosError: null
})
export const fetchTodosFailure = (state, { error }) => state.merge({
  fetchTodosError: error,
  fetching: false,
  todos: []
})
export const resetFetchingTodosError = state => state.merge({ resetFetchingTodosError: null })

// add Todo 
export const addTodoSuccess = (state, { newTodo }) => state.merge({
  newTodo,
  addTodoError: false,
  todos: [newTodo, ...state.todos]
})
export const addTodoFailure = (state, { error }) => state.merge({
  addTodoError: error,
  newTodo: null
})
export const resetAddTodoError = state => state.merge({ addTodoError: null })

// delete todo 
export const deleteTodoSuccess = (state, { id }) => state.merge({
  deleteTodoError: false,
  todos: [...state.todos.filter(todo => id !== todo.id)]
})
export const deleteTodoFailure = (state, { error }) => state.merge({
  deleteTodoError: error,
})
export const resetDeleteTodoError = state => state.merge({ resetAddTodoError: null })

// reducer

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_TODOS_START]: fetchTodosStart,
  [Types.FETCH_TODOS_SUCCESS]: fetchTodosSuccess,
  [Types.FETCH_TODOS_FAILURE]: fetchTodosFailure,
  [Types.RESET_FETCHING_TODOS_ERROR]: resetFetchingTodosError,
  // // add Todo
  [Types.ADD_TODO]: addTodoSuccess,
  [Types.ADD_TODO_FAILURE]: addTodoFailure,
  [Types.RESET_ADD_TODO_ERROR]: resetAddTodoError,
  // delete todo 
  [Types.DELETE_TODO]: deleteTodoSuccess,
  [Types.DELETE_TODO_FAILURE]: deleteTodoFailure,
  [Types.RESET_DELETE_TODO_ERROR]: resetDeleteTodoError
})