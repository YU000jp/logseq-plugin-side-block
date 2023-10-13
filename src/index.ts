import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { settingsTemplate } from './settings';
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import ja from "./translations/ja.json";


/* main */
const main = () => {
  (async () => {
    try {
      await l10nSetup({ builtinTranslations: { ja } });
    } finally {
      /* user settings */
      logseq.useSettingsSchema(settingsTemplate());
      if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);
    }
  })();


};/* end_main */



logseq.ready(main).catch(console.error);