import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//the language preference is stored in local storage if the language has not been stored in local storage yet it sets the language turkish automatically
if (localStorage.getItem("language") == null)
  localStorage.setItem("language", "tr");

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: localStorage.getItem("language"),
  resources: {
    //json files that shows the words in other languages
    en: {
      translations: require("./Locales/English.json"),
    },
    tr: {
      translations: require("./Locales/Turkish.json"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "tr"];

export default i18n;
