import React from 'react'
import renderer from 'react-test-renderer'
import ShowcaseJakub from './ShowcaseJakub.jsx'

describe('<ShowcaseJakub />', () => {
  it('renders author Jakub page', () => {
    const tree = renderer.create(<ShowcaseJakub />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
