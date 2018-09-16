import Actions, { reducer, INITIAL_STATE } from '../TodoRedux'

describe("TODO REDUX", () => {
  it('fetchTodosSuccess', () => {
    const todos = [
      { id: 1, title: "something" },
      { id: 2, title: "something2" },
    ]

    const state = reducer(INITIAL_STATE, Actions.fetchTodosSuccess(todos))

    expect(state.todos).toEqual(todos)
    expect(state.fetching).toBe(false)
  })

  it("fetchingSingleTodo", () => {
    const todo = [{ id: 2, title: "something" }]
    const state = reducer(INITIAL_STATE, Actions.fetchTodosSuccess(todo))
    expect(state.todos).toEqual(todo)
  })

  it("fetchigTodosFailure", () => {
    const error = { message: 'Something went wrong' }
    const state = reducer(INITIAL_STATE, Actions.fetchTodosFailure(error))

    expect(state.fetchTodosError).toEqual(error)
  })

  it("resetFethchingTodosError", () => {
    const state = reducer(INITIAL_STATE, Actions.resetFetchingTodosError())
    expect(state.fetchTodosError).toBe(null)
  })

  it("addTodoFailure", () => {
    const error = { message: 'something went wrong' }
    const state = reducer(INITIAL_STATE, Actions.addTodoFailure(error))
    expect(state.addTodoError).toEqual(error)
    expect(state.newTodo).toBeNull()
  })

  it("addTodo -success", () => {
    const addedTodo = { id: 1, title: "Something" }
    const state = reducer(INITIAL_STATE, Actions.addTodo(addedTodo))

    expect(state.newTodo).toEqual(addedTodo)
    expect(state.addTodoError).toBeNull()
  })

  it("addTodo-Failure", () => {
    const error = { message: "Something went wrong!" }
    const state = reducer(INITIAL_STATE, Actions.addTodoFailure(error))

    expect(state.addTodoError).toEqual(error)
  })

  it("deleteTodo-Success", () => {
    const deletedTodo = {id:4, title: "something"}
    const state = reducer(INITIAL_STATE, Actions.deleteTodo(deletedTodo.id))

    expect(state.deleteTodoError).toBeNull()
  })

  it('deleteTodo-Failure', () => {
    const error = {message:"Delete Todo Failed!!!"}
    const state = reducer(INITIAL_STATE, Actions.deleteTodoFailure(error))

    expect(state.deleteTodoError).toEqual(error)
  })
})
