import React from 'react'
import { render } from '@testing-library/react'
import HvacStatusIcon from '../HvacStatusIcon'

describe('<HvacStatusIcon />', () => {
  it('should render <HvacStatusIcon /> component', () => {
    expect(render(<HvacStatusIcon />)).not.toBeNull()
  })
})
