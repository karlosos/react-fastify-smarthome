import React from 'react'
import { render } from '@testing-library/react'
import LightSensorInner from '../LightSensorInner'

describe('<LightSensorInner />', () => {
  it('should render <LightSensorInner /> component', () => {
    expect(render(<LightSensorInner />)).not.toBeNull()
  })
})
