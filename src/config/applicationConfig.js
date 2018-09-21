import axios from 'axios'
const url = "https://jsonplaceholder.typicode.com/posts"
const headers = {
  "Content-type": "application/json; charset=UTF-8"
}
export const api = {
  get: () => axios({
    method: 'GET',
    url,
    headers
  }),
  post: (newPost) => axios({
    method: 'POST',
    url,
    body: JSON.stringify(newPost),
    headers
  }),
  put: (id, data) => axios({
    method: 'PUT',
    body: JSON.stringify(data),
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    headers
  }),
  delete: (id) => axios({
    method: "DELETE",
    url: `https://jsonplaceholder.typicode.com/posts/${id}`
  }),
  getCommentsOfPosts: (id) => axios({
    method: 'GET',
    url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    headers
  }),
  getPostsOfUser: (id) => axios({
    method: 'GET',
    url: `https://jsonplaceholder.typicode.com/users/${id}/posts`
  })
}