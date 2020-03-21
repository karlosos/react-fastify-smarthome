import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Header from '../Header.jsx'
import { MemoryRouter } from 'react-router-dom'

describe('<Header />', () => {
  let initialRoute
  beforeEach(async () => {
    initialRoute = ['/']
  })

  afterEach(cleanup)

  it('renders header component', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={initialRoute}>
        <Header />
      </MemoryRouter>
    )
    expect(queryByTestId('header-id')).toBeTruthy()
  })
  it('checks if the dashboard is in the tabs', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={initialRoute}>
        <Header />
      </MemoryRouter>
    )
    expect(queryByTestId('dashboard-tab-id')).toBeTruthy()
  })
})