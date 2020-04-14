import React from 'react'
import { render, screen, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import LanguageSelect from './index'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'

describe('<LanguageSelect />', () => {
  let mocki18n

  beforeEach(() => {
    mocki18n = i18n
    mocki18n.changeLanguage('en')
  })

  afterEach(() => {
    cleanup()
  })

  it('renders LanguageSelect component', () => {
    const root = render(
      <I18nextProvider i18n={mocki18n}>
        <LanguageSelect />
      </I18nextProvider>
    )
    expect(root).not.toBeNull()
  })

  it('changes i18n.language on language change', async () => {
    render(
      <I18nextProvider i18n={mocki18n}>
        <LanguageSelect />
      </I18nextProvider>
    )

    const languageMenu = screen.getByRole('button')
    fireEvent.mouseDown(languageMenu)

    await waitForElement(() => screen.getByText('PL'))
    const menuItem = screen.getByText('PL')
    fireEvent.click(menuItem)

    expect(mocki18n.language).toBe('pl')
  })

  it('changes language value in localStorage on language change', async () => {
    const localStorageMock = (function () {
      const store = {}
      return {
        getItem: function (key) {
          return store[key] || null
        },
        setItem: function (key, value) {
          store[key] = value.toString()
        }
      }
    })()

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })

    render(
      <I18nextProvider i18n={mocki18n}>
        <LanguageSelect />
      </I18nextProvider>
    )

    const languageMenu = screen.getByRole('button')
    fireEvent.mouseDown(languageMenu)

    await waitForElement(() => screen.getByText('PL'))
    const menuItem = screen.getByText('PL')
    fireEvent.click(menuItem)

    expect(window.localStorage.getItem('language')).toBe('pl')
  })
})
