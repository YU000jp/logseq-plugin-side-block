import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { settingsTemplate } from './settings';
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import ja from "./translations/ja.json";
import CSS from "./style.css?inline";
import { BlockEntity, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';
import { removeProvideStyle } from './lib';
export const keyNameToolbarPopup = "toolbar-box";//ポップアップのキー名

/* main */
const main = () => {

  (async () => {
    try {
      await l10nSetup({ builtinTranslations: { ja } });
    } finally {
      /* user settings */
      logseq.useSettingsSchema(await settingsTemplate());
      if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);
    }
  })();

  //初回読み込み時にCSSを反映させる
  /* side block */
  provideStyle();

  //常時適用CSS
  logseq.provideStyle(`
  div#root>div>main>div#app-container a.tag[data-ref*=".side"] {display: none}
  body>div#side-block--toolbar-box {
    & button {
      display: unset;
    }
    & hr {
      margin-top: 1em;
      margin-bottom: 1em;
    }
  }
  `);

  //ツールバーに設定画面を開くボタンを追加
  logseq.App.registerUIItem('toolbar', {
    key: 'sideBlockToolbar',
    template: `<div><a class="button icon" data-on-click="sideBlockToolbar" style="font-size: 14px">🥦</a></div>`,
  });
  //クリックイベント
  logseq.provideModel({
    //ツールバーのボタンをクリックしたら、ポップアップを表示
    sideBlockToolbar: () => {
      //ページコンテンツ
      const printMain = `
      <table>
      <tr><th>${t("Size")}</th><th>${t("Tag name")}</th><th>${t("Width")}</th></tr>
      <tr><td>Free</td><td><button class="button" id="sideBlockPopup--00" title="${t("Click here to insert a tag at the end of the current block.")}">#.side</button></td><td>unset</td></tr>
      <tr><td>S</td><td><button class="button" id="sideBlockPopup--01" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-s</button></td><td>100px</td></tr>
      <tr><td>M</td><td><button class="button" id="sideBlockPopup--02" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-m</button></td><td>200px</td></tr>
      <tr><td>L</td><td><button class="button" id="sideBlockPopup--03" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-l</button></td><td>300px</td></tr>
      <tr><td>LL</td><td><button class="button" id="sideBlockPopup--04" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-ll</button></td><td>400px</td></tr>
      <tr><td>LLL</td><td><button class="button" id="sideBlockPopup--05" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-lll</button></td><td>500px</td></tr>
      </table>
      <hr/>
      <p><small>${t("Tags containing \".side\" are displayed only when editing.")}</small></p>
      `;
      //ポップアップを作成
      openPopupFromToolbar(t("Select a parent block first, then click the tag name to insert that tag."), printMain);
      //イベントリスナー登録
      setTimeout(() => {
        const sideBlockPopup00 = parent.document.getElementById("sideBlockPopup--00") as HTMLButtonElement | null;
        const sideBlockPopup01 = parent.document.getElementById("sideBlockPopup--01") as HTMLButtonElement | null;
        const sideBlockPopup02 = parent.document.getElementById("sideBlockPopup--02") as HTMLButtonElement | null;
        const sideBlockPopup03 = parent.document.getElementById("sideBlockPopup--03") as HTMLButtonElement | null;
        const sideBlockPopup04 = parent.document.getElementById("sideBlockPopup--04") as HTMLButtonElement | null;
        const sideBlockPopup05 = parent.document.getElementById("sideBlockPopup--05") as HTMLButtonElement | null;
        if (sideBlockPopup00) sideBlockPopup00.addEventListener("click", () => eventReplaceAndInsert(".side"),);
        if (sideBlockPopup01) sideBlockPopup01.addEventListener("click", () => eventReplaceAndInsert(".side-s"),);
        if (sideBlockPopup02) sideBlockPopup02.addEventListener("click", () => eventReplaceAndInsert(".side-m"),);
        if (sideBlockPopup03) sideBlockPopup03.addEventListener("click", () => eventReplaceAndInsert(".side-l"),);
        if (sideBlockPopup04) sideBlockPopup04.addEventListener("click", () => eventReplaceAndInsert(".side-ll"),);
        if (sideBlockPopup05) sideBlockPopup05.addEventListener("click", () => eventReplaceAndInsert(".side-lll"),);
      }, 120);
    },
    //設定ボタンを押したら設定画面を開く
    showSettingsUI: () => logseq.showSettingsUI(),
  });

  //Setting changed
  logseq.onSettingsChanged((newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (newSet.booleanFunction !== oldSet.booleanFunction) {
      if (newSet.booleanFunction === true) provideStyle();
      else removeProvideStyle("side-block-style");
    }
  });

  logseq.beforeunload(async () => {
    //ポップアップを削除
    parent.document.getElementById(logseq.baseInfo.id + "--" + keyNameToolbarPopup)?.remove();
  });/* end_beforeunload */

};/* end_main */


const eventReplaceAndInsert = async (tag: string) => {

  //現在のブロックを取得
  const currentBlock = await logseq.Editor.getCurrentBlock() as BlockEntity | null;
  if (currentBlock) {
    //current.contentが空の場合はキャンセル
    if (currentBlock.content === "") {
      logseq.UI.showMsg(t("The current block is empty."), "warning");
      return;
    }
    console.log(currentBlock.content);
    //子ブロックを持たない場合は、子ブロックを追加
    if (currentBlock.children!.length === 0) await logseq.Editor.insertBlock(currentBlock.uuid, "");

    const ele = parent.document.querySelector(`div#root>div>main>div#app-container div[blockid="${currentBlock.uuid}"]`) as HTMLDivElement | null;
    if (ele) {
      //アウトライン表示
      ele.style.outline = "3px solid var(--ls-border-color)";
      setTimeout(() => ele.style.outline = "unset", 6000); //6秒後にアウトラインを消す
    }
    //現在のブロックの最後にタグを追加
    //tagに空白が含まれていたら、[[ ]]で囲む
    if (tag.includes(" ")) tag = "[[" + tag + "]]";
    // #.side-s、#.side-m、#.side-lll、#.side-ll、#.side-lを削除する。ただし、#.sideは最後に削除する
    let content = currentBlock.content.replaceAll(/ #\.side-s| #\.side-m| #\.side-lll| #\.side-ll| #\.side-l| #.side/g, "");

    //contentの中に、\nが含まれている場合、一つ目の\nの前に、tagを挿入する
    if (content.includes("\n")) content = content.replace("\n", " #" + tag + "\n");
    else content = content + " #" + tag;
    //ほかおタグが使われている場合は削除する
    await logseq.Editor.updateBlock(currentBlock.uuid, content, currentBlock.properties);
    logseq.UI.showMsg(t("Insert at editing block: #") + tag + ".", "info");
    logseq.Editor.editBlock(currentBlock.uuid);
  } else {
    //ブロックが選択されていない場合
    logseq.UI.showMsg(t("No block selected."), "warning");
  }
};

const provideStyle = () => logseq.provideStyle({ key: 'side-block-style', style: CSS });


const openPopupFromToolbar = (desc: string, printMain: string) => {
  //ポップアップを表示
  logseq.provideUI({
    attrs: {
      title: "Side Block plugin",
    },
    key: keyNameToolbarPopup,
    reset: true,
    style: {
      width: "370px",
      height: "600px",
      overflowY: "auto",
      left: "unset",
      bottom: "unset",
      right: "1em",
      top: "4em",
      paddingLeft: "2em",
      paddingTop: "2em",
      backgroundColor: 'var(--ls-primary-background-color)',
      color: 'var(--ls-primary-text-color)',
      boxShadow: '1px 2px 5px var(--ls-secondary-background-color)',
    },
    template: `
        <div title="">
        <div>
        <p>${desc} <button class="button" id="side-block--showSettingsUI" title="Side Block: ${t("plugin settings")}">⚙️</button></p>
        <hr/>
        ${printMain}
        </div>
        </div>
        `,
  });
  setTimeout(() => {
    //設定画面を開くボタンをクリックしたら、設定画面を開く
    const showSettingsUI = parent.document.getElementById("side-block--showSettingsUI") as HTMLButtonElement | null;
    if (showSettingsUI) showSettingsUI.addEventListener("click", () => logseq.showSettingsUI(), { once: true });
  }, 50);
};

logseq.ready(main).catch(console.error);