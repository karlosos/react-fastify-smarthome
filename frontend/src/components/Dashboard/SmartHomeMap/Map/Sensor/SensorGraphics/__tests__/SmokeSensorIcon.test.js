import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import SmokeSensorIcon from '../SmokeSensorIcon'

describe('<SmokeSensorIcon />', () => {
  it('should render <SmokeSensorIcon /> component', () => {
    expect(render(<SmokeSensorIcon />)).not.toBeNull()
  })

  it('should have color red and pulse animation if smoke is detected', () => {
    const isSmokeDetected = true
    const { queryByTestId } = render(<SmokeSensorIcon isSmokeDetected={isSmokeDetected} />)

    const icon = queryByTestId('smoke-sensor-inner')
    expect(icon).toHaveStyle('color: rgba(235, 49, 52, 1)')
    expect(icon).toHaveStyle('animation-duration: 1s')
  })

  it('should not have color red and pulse animation if smoke is not detected', () => {
    const isSmokeDetected = false
    const { queryByTestId } = render(<SmokeSensorIcon isSmokeDetected={isSmokeDetected} />)

    const icon = queryByTestId('smoke-sensor-inner')
    expect(icon).not.toHaveStyle('color: rgba(235, 49, 52, 1)')
    expect(icon).not.toHaveStyle('animation-duration: 1s')
  })

  it('should not have color red and pulse animation if isSmokeDetected value is not passed', () => {
    const { queryByTestId } = render(<SmokeSensorIcon />)

    const icon = queryByTestId('smoke-sensor-inner')
    expect(icon).not.toHaveStyle('color: rgba(235, 49, 52, 1)')
    expect(icon).not.toHaveStyle('animation-duration: 1s')
  })
})
