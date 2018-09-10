import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TodoActions from '../redux/TodoRedux'

import ListItem from '../components/ListItem'
import AddItem from '../components/AddItem'
class TodoContainer extends Component {
  render() {
    const { todos, deleteTodo } = this.props
    return (
      <div className='todo_container'>
        {this._renderAddTodo()}
        {this._renderTodos(todos, deleteTodo)}
      </div>
    )
  }
  _renderAddTodo = () => {
    return (
      <AddItem
        addItem={this._onAddTodo}
        buttonName='ADD TODO'
      />
    )
  }
  _onAddTodo = (retrievedValue) => {
    const newTodoObj = {
      userId: Math.floor(Math.random() * 100)+ 20,
      id: Math.floor(Math.random() * 100) + 300,
      title: retrievedValue,
      completed: false
    }
    console.log(newTodoObj)
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
          btnName='Delete'
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
  todos: PropTypes.array
}

const mapStateToProps = state => ({
  todos: state.todos.todos,
  deleteTodo: PropTypes.func,
  addTodo: PropTypes.func
})
const mapDispatchToProps = dispatch => ({
  fetchTodosStart: () => dispatch(TodoActions.fetchTodosStart()),
  addTodo: newTodo => dispatch(TodoActions.addTodo(newTodo)),
  deleteTodo: id => dispatch(TodoActions.deleteTodo(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer)