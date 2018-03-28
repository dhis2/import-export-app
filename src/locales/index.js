import i18n from 'd2-i18n'

import enTranslations from './en/translations.json'
import svTranslations from './sv/translations.json'
import urTranslations from './ur/translations.json'

const namespace = 'import-export-app'

i18n.addResources('en', namespace, enTranslations)
i18n.addResources('sv', namespace, svTranslations)
i18n.addResources('ur', namespace, urTranslations)

i18n.setDefaultNamespace(namespace)
i18n.changeLanguage('en')

export default i18n
