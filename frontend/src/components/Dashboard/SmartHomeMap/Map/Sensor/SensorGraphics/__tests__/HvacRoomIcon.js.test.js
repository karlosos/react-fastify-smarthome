import React from 'react'
import { render } from '@testing-library/react'
import HvacRoomIcon from '../HvacRoomIcon'

describe('<HvacRoomIcon />', () => {
  it('should render <HvacRoomIcon /> component', () => {
    expect(render(<HvacRoomIcon />)).not.toBeNull()
  })
})
