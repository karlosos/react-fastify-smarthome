import React from 'react'
import { render } from '@testing-library/react'
import WindowBlindsSensorIcon from '../WindowBlindsSensorIcon'

describe('<WindowBlindsSensorIcon />', () => {
  it('should render <WindowBlindsSensorIcon /> component', () => {
    expect(render(<WindowBlindsSensorIcon />)).not.toBeNull()
  })
})
