/* globals describe, test, expect */

import React from 'react'
import TestRenderer from 'react-test-renderer'
import Spinner from './index'

describe('<Spinner />', () => {
  test('renders Spinner component', () => {
    const root = TestRenderer.create(<Spinner />)
    expect(root.toJSON()).toMatchSnapshot()
  })
})
