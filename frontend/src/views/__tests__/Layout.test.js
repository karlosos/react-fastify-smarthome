/* globals  describe, afterEach, it, expect */

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Layout from '../Layout.jsx'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'

describe('<DashboardContent />', () => {
  let initialRoute
  beforeEach(async () => {
    initialRoute = ['/']
  })

  afterEach(cleanup)

  it('renders DashboardContent component', async () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={initialRoute}>
        <I18nextProvider i18n={i18n}>
          <Layout />
        </I18nextProvider>
      </MemoryRouter>)
    expect(queryByTestId('dashboard-id')).toBeTruthy()
  })
})
