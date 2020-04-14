import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import translations from './common/locales'

const ns = {
  namespaces: ['common', 'dashboard', 'hvac', 'authors']
}

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: navigator.language.slice(0, 2),
    fallbackLng: 'en',
    // debug: true,
    ns,
    defaultNS: 'common',
    resources: translations,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
