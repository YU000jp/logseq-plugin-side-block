import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { settingsTemplate } from './settings';
import CSS from "./style.css?inline";
import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';
import { removeProvideStyle } from './lib';


/* main */
const main = () => {

  /* user settings */
  logseq.useSettingsSchema(settingsTemplate());
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);

  //初回読み込み時にCSSを反映させる
  /* side block */
  provideStyle();

  //常時適用CSS
  logseq.provideStyle(`
  div#root>div>main>div#app-container a.tag[data-ref*=".side"] {display: none}
  `);


  //ツールバーに設定画面を開くボタンを追加
  logseq.App.registerUIItem('toolbar', {
    key: 'sideBlockSettingsButton',
    template: `<div><a class="button icon" data-on-click="sideBlockSettingsButton" style="font-size: 14px">🥦</a></div>`,
  });
  //ツールバーボタンのクリックイベント
  logseq.provideModel({
    sideBlockSettingsButton: () => {
      logseq.showSettingsUI();
    }
  });

  //Setting changed
  logseq.onSettingsChanged((newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (newSet.booleanFunction !== oldSet.booleanFunction) {
      if (newSet.booleanFunction === true) provideStyle();
      else removeProvideStyle("side-block-style");
    }
  });
};/* end_main */


const provideStyle = () => logseq.provideStyle({ key: 'side-block-style', style: CSS });


logseq.ready(main).catch(console.error);