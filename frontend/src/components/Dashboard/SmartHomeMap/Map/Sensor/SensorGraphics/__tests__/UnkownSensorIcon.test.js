import React from 'react'
import { render } from '@testing-library/react'
import UnknownSensorIcon from '../UnknownSensorIcon'

describe('<UnknownSensorIcon />', () => {
  it('should render <UnknownSensorIcon /> component', () => {
    expect(render(<UnknownSensorIcon />)).not.toBeNull()
  })
})
