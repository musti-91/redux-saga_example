import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}

global.localStorage = localStorageMock

import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

// set the default serializer for jest ti be from the enzyme-t-json
// this produces an easier to read (for humans) serialized format
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }))

// react 16 Enzyme Adapter
Enzyme.configure({ adapter: new Adapter() })

global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
global.sinon = sinon

export const historyMock = { push: jest.fn() }
global.history = historyMock

const sessionMock = { resetExpiry: jest.fn() }
global.sessionHandler = sessionMock

const authContextMock = { logOut: jest.fn() }
global.authContext = authContextMock

export const apiMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}
global.open = jest.fn()

const consoleMock = { warn: jest.fn(), log: console.log, error: console.error }
global.console = consoleMock