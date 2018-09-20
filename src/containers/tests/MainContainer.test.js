import React from "react"
import { shallow, mount } from 'enzyme'
import MainContainer from '../MainContainer'


describe('<MainContainer/>', () => {
  const children = <div> render some children </div>
  const manyChildren = [
    <div key={1}> child-1</div>,
    <div key={2}> child-2</div>,
    <div key={3}> child-3</div>,
    <div key={4}> child-4</div>,
    <div key={5}> child-5</div>,
  ]
  const wrapper = shallow(<MainContainer>{children}</MainContainer>)
  it('render without crashing', () => {
    mount(<MainContainer>
      {children}
    </MainContainer>)

  })
})