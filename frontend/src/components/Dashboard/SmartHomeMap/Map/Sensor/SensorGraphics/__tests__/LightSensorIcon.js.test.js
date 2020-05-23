import React from 'react'
import { render } from '@testing-library/react'
import LightSensorIcon from '../LightSensorIcon'

describe('<LightSensorIcon />', () => {
  it('should render <LightSensorIcon /> component', () => {
    expect(render(<LightSensorIcon />)).not.toBeNull()
  })
})
