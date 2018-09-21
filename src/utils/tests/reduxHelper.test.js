import { updateItem } from "../reduxHelper"

const array = [
  { id: 1, title: "first", userId: 3, body: "subtitle" },
  { id: 2, title: "second", userId: 3, body: "subtitle" },
  { id: 3, title: "third", userId: 3, body: "subtitle" }
]
const updatedPost = { title: 'updated', userId: 4, body: "subtitle" }
describe('reduxHelper', () => {
  it('should return an updated array', () => {
    const updatedArray = [
      { id: 1, title: "first", userId: 3, body: "subtitle" },
      { id: 2, title: "updated", userId: 4, body: "subtitle" },
      { id: 3, title: "third", userId: 3, body: "subtitle" }
    ]
    expect(updateItem(2, array, updatedPost)).toEqual(updatedArray)
  })
})