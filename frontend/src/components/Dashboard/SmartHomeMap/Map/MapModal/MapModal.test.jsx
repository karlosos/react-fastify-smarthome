import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../../i18n'
import MapModal from './MapModal'

describe('Map modal component test suite', () => {
  const component = render(
    <I18nextProvider i18n={i18n}>
      <MapModal />
    </I18nextProvider>

  )
  describe('render tests', () => {
    test('should render modal', () => {
      expect(component).not.toBeNull()
    })
  })
})
