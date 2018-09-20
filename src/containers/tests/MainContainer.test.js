import React from "react"
import { shallow, mount } from 'enzyme'
import MainContainer from '../MainContainer'

import { Provider } from 'react-redux'
describe('>>> ^^ START_TESTING_POINT ^^ >>> <MainContainer/>', () => {
  const children = <div> render some children </div>
  const manyChildren = [
    <div key={1}> child-1</div>,
    <div key={2}> child-2</div>,
    <div key={3}> child-3</div>,
    <div key={4}> child-4</div>,
    <div key={5}> child-5</div>,
  ]
  let wrapper
  let manyChildrenWrapper
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn()
  }
  it('render without crashing', () => {
    wrapper = shallow(
      <MainContainer store={store}>
        {children}
      </MainContainer>
    )
  })

  it('render with many children', () => {
    manyChildrenWrapper = shallow(<MainContainer store={store}>{manyChildren}</MainContainer>)
  })
})