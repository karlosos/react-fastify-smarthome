import React from 'react'
import { render } from '@testing-library/react'
import WindowBlindsSensorInner from '../WindowBlindsSensorInner'

describe('<WindowBlindsSensorInner />', () => {
  it('should render <WindowBlindsSensorInner /> component', () => {
    expect(render(<WindowBlindsSensorInner />)).not.toBeNull()
  })
})
