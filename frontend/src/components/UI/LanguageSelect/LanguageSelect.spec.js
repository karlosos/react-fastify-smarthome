import React from 'react'
import { render, screen, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import LanguageSelect from './index'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { SnackbarProvider } from 'notistack'

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack')
}))

describe('<LanguageSelect />', () => {
  let mocki18n

  beforeEach(() => {
    mocki18n = i18n
    mocki18n.changeLanguage('en')
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders LanguageSelect component', () => {
    const root = render(
      <SnackbarProvider>
        <I18nextProvider i18n={mocki18n}>
          <LanguageSelect />
        </I18nextProvider>
      </SnackbarProvider>
    )
    expect(root).not.toBeNull()
  })

  it('changes i18n.language on language change', async () => {
    render(
      <SnackbarProvider>
        <I18nextProvider i18n={mocki18n}>
          <LanguageSelect />
        </I18nextProvider>
      </SnackbarProvider>
    )

    const languageMenu = screen.getByRole('button')
    fireEvent.mouseDown(languageMenu)

    await waitForElement(() => screen.getByText('PL'))
    const menuItem = screen.getByText('PL')
    fireEvent.click(menuItem)

    expect(mocki18n.language).toBe('pl')
  })

  it('changes language value in localStorage to \'pl\' on choosing polish language option', async () => {
    const localStorageMock = (function () {
      return {
        getItem: jest.fn(),
        setItem: jest.fn()
      }
    })()

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })

    render(
      <SnackbarProvider>
        <I18nextProvider i18n={mocki18n}>
          <LanguageSelect />
        </I18nextProvider>
      </SnackbarProvider>
    )

    const languageMenu = screen.getByRole('button')
    fireEvent.mouseDown(languageMenu)

    await waitForElement(() => screen.getByText('PL'))
    const menuItem = screen.getByText('PL')
    fireEvent.click(menuItem)

    expect(window.localStorage.setItem).toBeCalledWith('language', 'pl')
  })

  it('changes language value in localStorage to \'en\' on choosing english language option', async () => {
    const localStorageMock = (function () {
      return {
        getItem: jest.fn(),
        setItem: jest.fn()
      }
    })()

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })

    mocki18n.changeLanguage('pl')
    render(
      <SnackbarProvider>
        <I18nextProvider i18n={mocki18n}>
          <LanguageSelect />
        </I18nextProvider>
      </SnackbarProvider>
    )

    const languageMenu = screen.getByRole('button')
    fireEvent.mouseDown(languageMenu)

    await waitForElement(() => screen.getByText('EN'))
    const menuItem = screen.getByText('EN')
    fireEvent.click(menuItem)

    expect(window.localStorage.setItem).toBeCalledWith('language', 'en')
  })
})
