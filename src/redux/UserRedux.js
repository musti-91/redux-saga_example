import Immutable from 'seamless-immutable'
import {createActions, createReducer} from 'reduxsauce' 


// Types and creators
const {Types, Creators}= createActions({
    fetchUsersStart: null,
    fetchUsersSuccess: ['users'],
    fetchUsersFailure: ["error"],
    resetFetchingUsersError: null,
    //  add user
    addUser: ["newUser"],
    addUserError: ["error"],
    resetAddUserError: null,
    // delete user 
    deleteUser: ["id"],
    deleteUserError:["error"],
    resetDeleteUserError: null
});

export const UserTypes= Types;
export default Creators;

// state
const INITIAL_STATE= Immutable({
    fetching: false,
    users: [],
    fetchUsersError: null,
    // add user
    newUser: null,
    addUserError: null,
    resetAddUserError: null,
    //delete user
    userId: null,
    deleteUserError: null,
});

// actions
export const fetchUsersStart = state => state.merge({
    fetching: true,
    users:[],
    fetchUsersError: null
});
export const fetchUsersSuccess = (state, { users }) => state.merge({
    fetching: false,
    users,
    fetchUsersError: null
})
export const fetchUsersFailure = (state, { error }) => state.merge({
    fetchUsersError: error,
    fetching: false
})
export const resetFetchingUsersError = state => state.merge({ fetchUsersError: null })

// add user
export const addUserSuccess = (state, { newUser }) => state.merge({
    newUser,
    users: [ newUser, ...state.users],
    addUserError: false
})
export const addUserError= (state, {error})=>state.merge({
    newUser: null,
    addUserError: error
})
export const resetAddUserError = state => state.merge({ addUserError: null})

//delete user
export const deleteUserSuccess = (state, { id }) => state.merge({
    deleteUserError: false,
    users: [...state.users.filter(user => id !== user.id)]
})
export const deleteUserError = (state, { error }) => state.merge({
    deleteUserError: error,
    userId: null
})
export const resetDeleteUserError = state => state.merge({ deleteUserError: null })
// create reducer
export const reducer = createReducer(INITIAL_STATE, {
    // fetching users
    [Types.FETCH_USERS_START]: fetchUsersStart,
    [Types.FETCH_USERS_SUCCESS]: fetchUsersSuccess,
    [Types.FETCH_USERS_FAILURE]: fetchUsersFailure,
    [Types.RESET_FETCHING_USERS_ERROR]: resetFetchingUsersError,
    // // add user
    [Types.ADD_USER]: addUserSuccess,
    [Types.ADD_USER_ERROR]: addUserError,
    [Types.RESET_ADD_USER_ERROR]: resetAddUserError,
    // // delete user
    [Types.DELETE_USER]: deleteUserSuccess,
    [Types.DELETE_USER_ERROR]: deleteUserError,
    [Types.RESET_DELETE_USER_ERROR]: resetDeleteUserError
})