import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import TemperatureSensorInner from '../TemperatureSensorInner'

describe('<TemperatureSensorInner />', () => {
  it('should render <TemperatureSensorInner /> component', () => {
    expect(render(<TemperatureSensorInner />)).not.toBeNull()
  })

  it('should have text that equals given temperature / 10', () => {
    const { getByText } = render(<TemperatureSensorInner temperature={-108} />)

    expect(getByText('-10.8')).toBeTruthy()
  })
})
