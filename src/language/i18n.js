import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'react-native-localize'
import en from './regions/en.json'
import vi from './regions/vi.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: Localization.getLocales()[0].languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
