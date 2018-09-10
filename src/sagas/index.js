
import { takeLatest, takeEvery } from 'redux-saga';
import { all } from 'redux-saga/effects';

import { UserTypes } from '../redux/UserRedux' 
import { TodosTypes } from '../redux/TodoRedux'

import { deleteUser, fetchUsersStart, addUser} from './userSaga'
import {fetchTodosStart, addTodo, deleteTodo} from './TodoSaga'
export default (()=>{
    return function* rootSaga(){
        yield all([
            // users
            takeEvery(UserTypes.FETCH_USERS_START, fetchUsersStart),
            takeLatest(UserTypes.ADD_USER, addUser),
            takeLatest(UserTypes.DELETE_USER, deleteUser),
            // todos
            takeLatest(TodosTypes.FETCH_TODOS_START, fetchTodosStart),
            takeLatest(TodosTypes.ADD_TODO, addTodo),
            takeLatest(TodosTypes.DELETE_TODO, deleteTodo)
        ])
    }
})