import { createI18n, LocaleMessages } from "vue-i18n";

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context("@/locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export const i18n = createI18n({
  locale: "de",
  messages: loadLocaleMessages()
});
