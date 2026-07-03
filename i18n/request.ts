import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { type Locale } from "./config";

// Static imports
import faMessages from "./messages/fa.json";
import enMessages from "./messages/en.json";

const messagesMap = {
  fa: faMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  

  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  console.log("Final locale used:", locale);

  const config = {
    locale,
    messages: messagesMap[locale as keyof typeof messagesMap],
  };

  return config;
});
