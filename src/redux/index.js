import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
// reducers
import { reducer as userReducer } from './UserRedux'

import { fetchUsersStart } from '../sagas/userSaga';

export default (() => {

    const middleware = []
    const enhancers = []

    const rootReducer = combineReducers({
        users: userReducer
    })

    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware);

    const logger = createLogger()
    middleware.push(logger)

    enhancers.push(applyMiddleware(...middleware))

    const store = createStore(rootReducer, compose(...enhancers))

    sagaMiddleware.run(fetchUsersStart);

    return store;
})()