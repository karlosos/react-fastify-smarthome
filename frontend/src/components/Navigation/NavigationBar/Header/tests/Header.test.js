import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Header from '../Header.jsx'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../../i18n'

describe('<Header />', () => {
  let initialRoute
  beforeEach(async () => {
    initialRoute = ['/']
  })

  afterEach(cleanup)

  it('renders header component', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={initialRoute}>
        <I18nextProvider i18n={i18n}>
          <Header />
        </I18nextProvider>
      </MemoryRouter>
    )
    expect(queryByTestId('header-id')).toBeTruthy()
  })
  it('checks if the dashboard is in the tabs', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={initialRoute}>
        <I18nextProvider i18n={i18n}>
          <Header />
        </I18nextProvider>
      </MemoryRouter>
    )
    expect(queryByTestId('dashboard-tab-id')).toBeTruthy()
  })
})
