export const updateItem = (id, array, newItem) => {
  array.filter(item => {
    if (item.id === id) {
      return (item.title = !newItem.title ? item.title : newItem.title) &&
        (item.body = !newItem.body ? item.body : newItem.body) &&
        (item.userId = !newItem.userId ? item.userId : newItem.userId)
    }
  })
  return array
}