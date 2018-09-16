import Actions, { reducer, INITIAL_STATE } from '../UserRedux'

describe('UserRedux', () => {
  it("fetchUserSuccess", () => {
    const users = [{ id: 2, name: "someone" }, { id: 4, name: 'anotherone' }]
    const state = reducer(INITIAL_STATE, Actions.fetchUsersSuccess(users))

    expect(state.fetching).toBeFalsy()
    expect(state.users).toEqual(users)
  })
  it("fetchUsersFailure", () => {
    const error = { message: "something went wrong!" }
    const state = reducer(INITIAL_STATE, Actions.fetchUsersFailure(error))

    expect(state.fetchUsersError).toEqual(error)
    expect(state.fetching).toBeFalsy()
  })
  it('addUserFailure', () => {
    const error = { message: 'added user error' }
    const state = reducer(INITIAL_STATE, Actions.addUserFailure(error))

    expect(state.newUser).toBeNull()
    expect(state.addUserError).toEqual(error)
  })
  it('addUserSuccess', () => {
    const addedUser = { id: 3, name: "newUser" }
    const state = reducer(INITIAL_STATE, Actions.addUser(addedUser))

    expect(state.newUser).toEqual(addedUser)
  })

  it("deleteUser-success", () => {
    const deletedUser = { id: 4, name: "Someone" }
    const state = reducer(INITIAL_STATE, Actions.deleteUser(deletedUser.id))

    expect(state.deleteUserError).toBeFalsy()
  })

  it("deleteUser-Failure", () => {
    const error = { message: "user won't deleted!!" }
    const state = reducer(INITIAL_STATE, Actions.deleteUserError(error))

    expect(state.deleteUserError).toEqual(error)
  })
})