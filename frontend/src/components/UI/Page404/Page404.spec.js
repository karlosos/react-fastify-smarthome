/* globals describe, test, expect */

import React from 'react'
import Page404 from './index'
import Button from '@material-ui/core/Button'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'

describe('<Page404 />', () => {
  test('renders Page404 component', () => {
    const root = TestRenderer.create(
      <I18nextProvider i18n={i18n}>
        <Page404 />
      </I18nextProvider>
    )
    expect(root.toJSON()).toMatchSnapshot()
  })

  test('should call function on refresh button click', () => {
    const mockFn = jest.fn()

    const { getByText } = render(
      <Button
        onClick={mockFn}
      >
        Odśwież
      </Button>
    )

    const button = getByText('Odśwież')
    fireEvent.click(button)
    expect(mockFn).toHaveBeenCalled()
  })
})
