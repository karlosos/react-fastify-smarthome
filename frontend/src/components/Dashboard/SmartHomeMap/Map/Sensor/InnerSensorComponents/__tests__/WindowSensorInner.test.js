import React from 'react'
import { render } from '@testing-library/react'
import WindowSensorInner from '../WindowSensorInner'

describe('<WindowSensorInner />', () => {
  it('should render <WindowSensorInner /> component', () => {
    expect(render(<WindowSensorInner />)).not.toBeNull()
  })

  it('should be a LaunchIcon if window is open', () => {
    const { queryByTestId } = render(<WindowSensorInner status='open' />)

    expect(queryByTestId('window-sensor-launch-icon')).toBeTruthy()
    expect(queryByTestId('border-all-icon')).not.toBeTruthy()
  })

  it('should be a BorderAllIcon if window is open', () => {
    const { queryByTestId } = render(<WindowSensorInner status='closed' />)

    expect(queryByTestId('window-sensor-launch-icon')).not.toBeTruthy()
    expect(queryByTestId('border-all-icon')).toBeTruthy()
  })
})
