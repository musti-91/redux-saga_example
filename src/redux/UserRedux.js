import Immutable from 'seamless-immutable'
import {createActions, createReducer} from 'reduxsauce' 


// Types and creators
const {Types, Creators}= createActions({
    fetchUsersStart:null,
    fetchUsersSuccess:['users'],
    fetchUsersFailure: ["error"],
    //  add user
    addUser: ["newUser"],
    addUserError: ["error"],
    // delete user 
    deleteUser: ["id"],
    deleteUserError:["error"]
});

export const UserTypes= Types;
export default Creators;

// state
const INITIAL_STATE= Immutable({
    fetching: false,
    users: [],
    fetchUsersError: false,
    // add user
    newUser: null,
    addUserError: null,
    //delete user
    userId:null,
    deleteUserError: null

});

// actions
export const fetchUsersStart=state=>state.merge({
    fetching: true,
    users:[],
    fetchUsersError: false
});
export const fetchUsersSuccess=(state, {users})=>state.merge({
    fetching: false,
    users,
    fetchUsersError:false
})
export const fetchUsersFailure= (state, {error})=>state.merge({
    fetchUsersError: error,
    fetching: false
})
// add user
export const addUser=(state, {newUser})=>state.merge({
    newUser,
    users: [...state.users, newUser],
    addUserError: false
})
export const addUserError= (state, {error})=>state.merge({
    newUser: null,
    addUserError: error
})
//delete user
export const deleteUser=(state, {id})=>state.merge({
    deleteUserError: false,
    users: [...state.users.filter(user =>id !== user.id)]
})
export const deleteUserError= (state, {error})=>state.merge({
    deleteUserError: error,
    userId: null
})
// create reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_USERS_START]:fetchUsersStart,
    [Types.FETCH_USERS_SUCCESS]: fetchUsersSuccess,
    [Types.FETCH_USERS_FAILURE]: fetchUsersFailure,
    [Types.ADD_USER]: addUser,
    [Types.ADD_USER_ERROR]: addUserError,
    [Types.DELETE_USER]: deleteUser,
    [Types.DELETE_USER_ERROR]: deleteUserError
})