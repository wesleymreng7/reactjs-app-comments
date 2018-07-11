import React from 'react'
import { shallow, mount, render } from 'enzyme'
import App from './App'
import base from './base'

describe('<App />', () => {
  const base = {
    syncState: jest.fn()
  }
  it('renders without crashing', () => {
    const wrapper = shallow(<App base={base} />)
    expect(wrapper.length).toBe(1)
  })
  it('shoud have .container class', () => {
    const wrapper = shallow(<App base={base}/>)
    expect(wrapper.is('.container')).toBe(true)
  })
  it('show Comments', () => {
    const wrapper = shallow(<App base={base} />)
    expect(wrapper.find('Comments').length).toBe(1)
  })
  it('show NewComments', () => {
    const wrapper = shallow(<App base={base} />)
    expect(wrapper.find('NewComment').length).toBe(1)
  })
  /*it('Outputs the <App />', () => {
    const wrapperShallow = shallow(<App />)
    const wrapperMount = mount(<App />)
    const wrapperRender = render(<App />)

    console.log(wrapperShallow.debug())
    console.log(wrapperMount.debug())
    console.log(wrapperRender.html())
  })*/

  it('Adds a new comment to state when postNewComment is called', () => {
    const wrapper = mount(<App base={base} />)
    wrapper.instance().postNewComment( { comment: 'test'} )
    wrapper.instance().postNewComment( { comment: 'test'} )
    wrapper.instance().postNewComment( { comment: 'test'} )
    const comments = Object.keys(wrapper.instance().state.comments)
    expect(comments.length).toBe(3)
  })
})

