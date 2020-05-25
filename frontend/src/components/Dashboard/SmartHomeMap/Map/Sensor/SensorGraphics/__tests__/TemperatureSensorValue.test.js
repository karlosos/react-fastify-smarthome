import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import TemperatureSensorValue from '../TemperatureSensorValue'

describe('<TemperatureSensorValue />', () => {
  it('should render <TemperatureSensorValue /> component', () => {
    expect(render(<TemperatureSensorValue />)).not.toBeNull()
  })

  it('should have text that equals given temperature', () => {
    const { getByText } = render(<TemperatureSensorValue temperature={-10.8} />)

    expect(getByText('-10.8')).toBeTruthy()
  })

  it('should have text that equals 15 if temperature value is not passed', () => {
    const { getByText } = render(<TemperatureSensorValue />)

    expect(getByText('15')).toBeTruthy()
  })
})
