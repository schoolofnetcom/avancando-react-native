import I18n from 'react-native-i18n';

import en from './locales/en';

I18n.fallback = true;
I18n.translations = {
    'en' : en,
    'en-US' : en
};

export default I18n;