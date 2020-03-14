/* globals , describe, it, afterEach, expect */

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Dashboard from './index'

describe('<DashboardContent />', () => {
  afterEach(cleanup)
  it('renders DashboardContent component', async () => {
    const { queryByTestId } = render(<Dashboard />)
    expect(queryByTestId('dashboard-content-id')).toBeTruthy()
  })
})
