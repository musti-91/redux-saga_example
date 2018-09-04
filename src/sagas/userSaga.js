import { call, put} from 'redux-saga/effects'
import axios from 'axios'

import UserActions from '../redux/UserRedux'



function apiCall(){
    return axios({
        method:'get',
        url:'http://jsonplaceholder.typicode.com/users'
    })
}

export function* fetchUsersSuccess(){
    yield put(UserActions.fetchUsersStart())
    try{
        const response= yield call(apiCall);
        const data= response.data;
        yield put(UserActions.fetchUsersSuccess(data));
    }
    catch(error){
        yield put(UserActions.fetchUsersFailure(error))
    }
}
export function* addUser(newUser){
    try{
       yield put(UserActions.addUser(newUser));
    }
    catch(error){
      yield put(UserActions.addUserError(error))
    }
}
export function* deleteUser(id){
    try{
       yield put(UserActions.deleteUser(id));
    }
    catch(error){
      yield put(UserActions.deleteUserError(error))
    }
}