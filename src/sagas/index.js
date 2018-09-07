
import { takeLatest, takeEvery } from 'redux-saga';
import { all } from 'redux-saga/effects';

import { deleteUser, fetchUsersStart, addUser} from './userSaga'
import { UserTypes } from '../redux/UserRedux' 

export default (()=>{
    return function* rootSaga(){
        yield all([
            // fetch users
            takeEvery(UserTypes.FETCH_USERS_START, fetchUsersStart),
            // add user
            takeLatest(UserTypes.ADD_USER, addUser),
            // delete user
            takeLatest(UserTypes.DELETE_USER, deleteUser),
        ])
    }
})