/* globals describe, test, expect, done */

import React from 'react'
import Page404 from './index'
import Button from '@material-ui/core/Button'
import { render, fireEvent } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'

describe('<Page404 />', () => {
  test('renders Page404 component', () => {
    const root = TestRenderer.create(<Page404 />)
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
