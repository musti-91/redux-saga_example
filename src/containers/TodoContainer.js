import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TodoActions from '../redux/TodoRedux'

import ListItem from '../components/tables/ListItem'
import AddForm from '../components/forms/AddForm'
class TodoContainer extends Component {
  componentDidMount() {
    this.props.fetchTodosStart()
  }
  render() {
    const { todos, deleteTodo, fetching } = this.props
    return (
      <div className='todo_container'>
        {this._renderHeader()}
        {!fetching && this._renderAddTodo()}
        {!fetching && this._renderTodos(todos, deleteTodo)}
      </div>
    )
  }
  _renderHeader = () => (
    <header>
      <h2>Todos</h2>
    </header>
  )
  _renderAddTodo = () => {
    return (
      <AddForm
        addItem={this._onAddTodo}
        buttonLabel='ADD TODO'
        placeHolder='insert new todo'
      />
    )
  }
  _onAddTodo = (retrievedValue) => {
    const newTodoObj = {
      userId: Math.floor(Math.random() * 100) + 20,
      id: Math.floor(Math.random() * 100) + 300,
      title: retrievedValue,
      completed: false
    }
    this.props.addTodo(newTodoObj)
  }

  _renderTodos = (todos, deleteTodo) => (
    <ul>
      {todos.map(todo =>
        <ListItem
          hasCheckBox={true}
          text={todo.title}
          isComplete={todo.completed}
          hasButton={true}
          buttonLabel='Delete'
          key={todo.id}
          onButtonClicked={() => deleteTodo(todo.id)}
        />
      )}
    </ul>
  )

  _onDeleteTodo = (todoId, deleteTodo) => () => {
    deleteTodo(todoId)
  }

}
TodoContainer.propTypes = {
  todos: PropTypes.array,
  fetching: PropTypes.bool,
  fetchTodosError: PropTypes.object,
  addTodoError: PropTypes.object,
  deleteTodoError: PropTypes.object,
  // functions
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  fetchTodosStart: PropTypes.func
}

const mapStateToProps = state => ({
  todos: state.todos.todos,
  fetching: state.todos.fetching,
  fetchTodosError: state.todos.fetchTodosError,
  addTodoError: state.todos.addTodoError,
  deleteTodoError: state.todos.deleteTodoError
})
const mapDispatchToProps = dispatch => ({
  fetchTodosStart: () => dispatch(TodoActions.fetchTodosStart()),
  addTodo: newTodo => dispatch(TodoActions.addTodo(newTodo)),
  deleteTodo: id => dispatch(TodoActions.deleteTodo(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer)