import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
// reducers
import { reducer as userReducer } from './UserRedux'
import {reducer as todoReducer } from './TodoRedux'


import RootSaga from '../sagas'

export default (() => {

    const middleware = []
    const enhancers = []

    const rootReducer = combineReducers({
        users: userReducer,
        todos: todoReducer
    })

    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware);

    const logger = createLogger()
    middleware.push(logger)

    enhancers.push(applyMiddleware(...middleware))

    const store = createStore(rootReducer, compose(...enhancers))

    sagaMiddleware.run(RootSaga)
    // sagaMiddleware.run(fetchUsersStart)
    // sagaMiddleware.run(fetchTodosStart)
    return store;
})()