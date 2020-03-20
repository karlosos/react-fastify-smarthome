// /* globals , describe, it, expect */

import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Dashboard from '../index'

import myStore from '../../../../store'

describe('<Dashboard />', () => {
  let component
  it('should render Dashboard with given store', () => {
    component = renderer.create(
      <Provider store={myStore}>
        <Dashboard />
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})