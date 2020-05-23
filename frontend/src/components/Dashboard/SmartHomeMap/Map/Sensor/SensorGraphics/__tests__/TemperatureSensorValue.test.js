import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import TemperatureSensorValue from '../TemperatureSensorValue'

describe('<TemperatureSensorValue />', () => {
  it('should render <TemperatureSensorValue /> component', () => {
    expect(render(<TemperatureSensorValue />)).not.toBeNull()
  })

  it('should have text that equals given temperature / 10', () => {
    const { getByText } = render(<TemperatureSensorValue temperature={-108} />)

    expect(getByText('-10.8')).toBeTruthy()
  })
})
