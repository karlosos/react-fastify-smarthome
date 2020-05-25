import React from 'react'
import { render } from '@testing-library/react'
import TemperatureSensorIcon from '../TemperatureSensorIcon'
import '@testing-library/jest-dom'

describe('<WindowSensorIcon />', () => {
  it('should render <WindowSensorIcon /> component', () => {
    expect(render(<TemperatureSensorIcon />)).not.toBeNull()
  })

  it('should be a faThermometerEmpty if temperature is below 0', () => {
    const { container } = render(<TemperatureSensorIcon temperature={-5} />)

    expect(container.firstChild).toHaveClass('fa-thermometer-empty')
  })

  it('should be a faThermometerQuarter if temperature is above 0 and below 10', () => {
    const { container } = render(<TemperatureSensorIcon temperature={5} />)

    expect(container.firstChild).toHaveClass('fa-thermometer-quarter')
  })

  it('should be a faThermometerHalf if temperature is above 10 below 20', () => {
    const { container } = render(<TemperatureSensorIcon temperature={15} />)

    expect(container.firstChild).toHaveClass('fa-thermometer-half')
  })

  it('should be a faThermometerThreeQuarters if temperature is above 20 below 30', () => {
    const { container } = render(<TemperatureSensorIcon temperature={25} />)

    expect(container.firstChild).toHaveClass('fa-thermometer-three-quarters')
  })

  it('should be a faThermometerFull if temperature is above 30', () => {
    const { container } = render(<TemperatureSensorIcon temperature={35} />)

    expect(container.firstChild).toHaveClass('fa-thermometer-full')
  })

  it('should be a faThermometerHalf if temperature is not passed', () => {
    const { container } = render(<TemperatureSensorIcon />)

    expect(container.firstChild).toHaveClass('fa-thermometer-half')
  })
})
