import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import WindowBlindsSensorIcon from '../WindowBlindsSensorIcon'

describe('<WindowBlindsSensorIcon />', () => {
  it('should render <WindowBlindsSensorIcon /> component', () => {
    expect(render(<WindowBlindsSensorIcon />)).not.toBeNull()
  })

  it('should have an icon suggesting that blind is fully open if position value is above 87', () => {
    const { queryByTestId } = render(<WindowBlindsSensorIcon position={88} />)

    expect(queryByTestId('blind-icon')).toHaveStyle('clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%)')
  })

  it('should have an icon suggesting that blind is 25% closed if position value is above 62 and below 87', () => {
    const { queryByTestId } = render(<WindowBlindsSensorIcon position={68} />)

    expect(queryByTestId('blind-icon')).toHaveStyle('clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%)')
  })

  it('should have an icon suggesting that blind is half closed if position value is above 37 and below 62', () => {
    const { queryByTestId } = render(<WindowBlindsSensorIcon position={50} />)

    expect(queryByTestId('blind-icon')).toHaveStyle('clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%)')
  })

  it('should have an icon suggesting that blind is 75% closed if position above 12 and below 37', () => {
    const { queryByTestId } = render(<WindowBlindsSensorIcon position={25} />)

    expect(queryByTestId('blind-icon')).toHaveStyle('clip-path: polygon(0 0, 100% 0, 100% 75%, 0 75%)')
  })

  it('should have an icon suggesting that blind is fully closed if position above 0 and below 12', () => {
    const { queryByTestId } = render(<WindowBlindsSensorIcon position={5} />)

    expect(queryByTestId('blind-icon')).toHaveStyle('clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)')
  })

  it('should have an icon suggesting that blind is half closed if position value is not passed', () => {
    const { queryByTestId } = render(<WindowBlindsSensorIcon />)

    expect(queryByTestId('blind-icon')).toHaveStyle('clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%)')
  })
})
