import React from 'react'
import { render } from '@testing-library/react'
import RFIDSensorIcon from '../RFIDSensorIcon'

describe('<RFIDSensorIcon />', () => {
  it('should render <RFIDSensorIcon /> component', () => {
    expect(render(<RFIDSensorIcon />)).not.toBeNull()
  })
})
