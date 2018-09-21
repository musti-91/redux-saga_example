import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}

global.localStorage = localStorage

export const history = { push: jest.fn() }
global.history = history

const sessionHandler = { resetExpiry: jest.fn() }
global.sessionHandler = sessionHandler

const authContext = { logOut: jest.fn() }
global.authContext = authContext

export const apiMock = {
  get: jest.fn(() => 'GET'),
  post: jest.fn(() => 'POST'),
  put: jest.fn(() => 'PUT'),
  delete: jest.fn(() => 'DELETE')
}

global.open = jest.fn()