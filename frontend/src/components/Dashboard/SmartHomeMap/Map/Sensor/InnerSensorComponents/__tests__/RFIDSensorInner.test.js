import React from 'react'
import { render } from '@testing-library/react'
import RFIDSensorInner from '../RFIDSensorInner'

describe('<RFIDSensorInner />', () => {
  it('should render <RFIDSensorInner /> component', () => {
    expect(render(<RFIDSensorInner />)).not.toBeNull()
  })
})
