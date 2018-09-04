import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware  from 'redux-saga'
import {createLogger} from 'redux-logger'
// reducers
import {reducer as userReducer} from './UserRedux'

import { fetchUsersSuccess} from '../sagas/userSaga';

export default (()=>{
    const rootReducer= combineReducers({
        users: userReducer
    })
    const middlewares=[]
    const enhancers=[]
    const sagaMiddleware=createSagaMiddleware()
    middlewares.push(sagaMiddleware);
   
    const logger= createLogger()
    middlewares.push(logger)

    enhancers.push(applyMiddleware(...middlewares))
    const store= createStore(rootReducer, compose(...enhancers))
    sagaMiddleware.run(fetchUsersSuccess);
    return store;
})()