import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MapModal from './MapModal'

describe('Map modal component test suite', () => {
  const component = render(<MapModal />)
  describe('render tests', () => {
    test('should render modal', () => {
      expect(component).not.toBeNull()
    })
  })
})
