import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom/matchers'
import Sensor from './Sensor'

const styleMock = {
  top: '20px', left: '50px'
}

describe('Sensor component test suite', () => {
  test('should have styles', () => {
    expect(render(
      <Sensor position={styleMock} />
    ).getByTestId('sensor-id')).toHaveStyle(styleMock)
  })
})
