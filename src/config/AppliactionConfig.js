export default (async () => {
  const todos = await
    fetch('/http://jsonplaceholder.typicode.com/todos')
  const users = await fetch('/http://jsonplaceholder.typicode.com/users')
  return {
    todos: todos.json(),
    users: users.json(),
  }
})()