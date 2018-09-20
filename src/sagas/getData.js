import axios from 'axios'

export function getPosts () {
  return axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts'
  })
}