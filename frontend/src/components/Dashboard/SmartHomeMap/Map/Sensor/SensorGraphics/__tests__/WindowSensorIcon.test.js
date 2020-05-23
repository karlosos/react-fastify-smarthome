import React from 'react'
import { render } from '@testing-library/react'
import WindowSensorIcon from '../WindowSensorIcon'

describe('<WindowSensorIcon />', () => {
  it('should render <WindowSensorIcon /> component', () => {
    expect(render(<WindowSensorIcon />)).not.toBeNull()
  })

  it('should be a LaunchIcon if window is open', () => {
    const { queryByTestId } = render(<WindowSensorIcon status='open' />)

    expect(queryByTestId('window-sensor-launch-icon')).toBeTruthy()
    expect(queryByTestId('border-all-icon')).not.toBeTruthy()
  })

  it('should be a BorderAllIcon if window is open', () => {
    const { queryByTestId } = render(<WindowSensorIcon status='closed' />)

    expect(queryByTestId('window-sensor-launch-icon')).not.toBeTruthy()
    expect(queryByTestId('border-all-icon')).toBeTruthy()
  })
})
