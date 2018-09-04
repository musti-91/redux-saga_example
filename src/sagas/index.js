
import { takeLatest, takeEvery } from 'redux-saga';
import { all } from 'redux-saga/effects';

import {fetchUsersSuccess, addUser, deleteUser, fetchUsersStart} from './userSaga'
import {UserTypes} from '../redux/UserRedux' 
export default (()=>{
    return function* rootSaga(){
        yield all([
            takeEvery(UserTypes.FETCH_USERS_START, fetchUsersStart),
            takeLatest(UserTypes.FETCH_USERS_SUCCESS, fetchUsersSuccess),
            takeLatest(UserTypes.ADD_USER, addUser),
            takeLatest(UserTypes.DELETE_USER, deleteUser)
        ])
    }
})