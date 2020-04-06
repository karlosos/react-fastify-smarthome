/* globals  describe, afterEach, it, expect */

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Layout from '../Layout.jsx'
import { MemoryRouter } from 'react-router-dom'

describe('<DashboardContent />', () => {
  let initialRoute
  beforeEach(async () => {
    initialRoute = ['/']
  })

  afterEach(cleanup)

  it('renders DashboardContent component', async () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={initialRoute}>
        <Layout />
      </MemoryRouter>)
    expect(queryByTestId('dashboard-id')).toBeTruthy()
  })
})
