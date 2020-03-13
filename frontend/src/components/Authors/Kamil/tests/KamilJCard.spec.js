/* globals describe, test, expect */

import React from 'react'
import TestRenderer from 'react-test-renderer'
import KamilJCard from '../KamilJCard'

describe('<KamilJCard />', () => {
  test('renders author KamilJCard component', () => {
    const root = TestRenderer.create(<KamilJCard />)
    expect(root.toJSON()).toMatchSnapshot()
  })
})
