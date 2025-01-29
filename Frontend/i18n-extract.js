// i18n-extract.js
import i18nextScanner from 'i18next-scanner';


const options = {
  input: ["./src/**/*.{js,jsx}"], // paths to scan
  output: "./src/locales", // where to output the translation files
  lngs: ["en", "hi"],
  resource: {
    en: "translation.json",
    hi: "translation.json",
  },
};
// console.log("i18n extraction started...");

i18nextScanner(options, (err, res) => {
  if (err) {
    console.error("Error while scanning", err);
  } else {
    console.log("Scanning complete!", res);
  }
});
