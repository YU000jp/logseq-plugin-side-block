import '@logseq/libs' //https://plugins-doc.logseq.com/
import { BlockEntity, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { removeProvideStyle } from './lib'
import { logseqModelCheck } from './logseqModelCheck'
import { settingsTemplate } from './settings'
import CSS from "./style.css?inline"
import { loadLogseqL10n } from './translations/l10nSetup'

// 変数 (同じモジュール内で使用するため、exportしない)
let logseqVersion: string = "" //バージョンチェック用
let logseqMdModel: boolean = false //モデルチェック用
// 外部から参照するためにexportする
export const replaceLogseqVersion = (version: string) => logseqVersion = version
export const replaceLogseqMdModel = (mdModel: boolean) => logseqMdModel = mdModel

export const keyPopup = "toolbar-box"//ポップアップのキー名
const keyStyle = "side-block-style"//CSSのキー名
const keyToolbar = "sideBlockToolbar"//ツールバーのキー名
const keyButton00 = "sideBlockPopup00"//挿入ボタンのキー名
const keyButton01 = "sideBlockPopup01"//挿入ボタンのキー名
const keyButton02 = "sideBlockPopup02"//挿入ボタンのキー名
const keyButton03 = "sideBlockPopup03"//挿入ボタンのキー名
const keyButton04 = "sideBlockPopup04"//挿入ボタンのキー名
const keyButton05 = "sideBlockPopup05"//挿入ボタンのキー名
const keyShowSettingsUI = "showSettingsUI"//設定画面を開くボタンのキー名

/* main */
const main = async () => {

  // Logseqモデルのチェックを実行(グラフ種別を検出してフラグを更新)
  await logseqModelCheck()

  // ユーザー設定言語を取得し、L10Nをセットアップ
  const { preferredLanguage, preferredDateFormat } = await loadLogseqL10n()

  /* user settings */
  logseq.useSettingsSchema(await settingsTemplate())

  //トグルで有効になるCSS
  provideStyleMain(logseq.settings!.booleanFunction as boolean)

  //常時適用CSS
  logseq.provideStyle(`
  body>div#side-block--toolbar-box {
    & button {
      display: unset;
    }
    & hr {
      margin-top: 1em;
      margin-bottom: 1em;
    }
  }
  `)

  //ツールバーに設定画面を開くボタンを追加
  logseq.App.registerUIItem('toolbar', {
    key: keyToolbar,
    template: `<div><a class="button icon" data-on-click="${keyToolbar}" style="font-size: 14px">🥦</a></div>`,
  })
  //クリックイベント
  logseq.provideModel({

    //ツールバーのボタンをクリックしたら、ポップアップを表示
    [keyToolbar]: () => showPopup(),

    //設定ボタンを押したら設定画面を開く
    [keyShowSettingsUI]: () => logseq.showSettingsUI(),

    // タグ名をクリックしたら、タグを挿入する
    [keyButton00]: () => eventReplaceAndInsert(".side"),
    [keyButton01]: () => eventReplaceAndInsert(".side-s"),
    [keyButton02]: () => eventReplaceAndInsert(".side-m"),
    [keyButton03]: () => eventReplaceAndInsert(".side-l"),
    [keyButton04]: () => eventReplaceAndInsert(".side-ll"),
    [keyButton05]: () => eventReplaceAndInsert(".side-lll"),

  })

  //Setting changed
  logseq.onSettingsChanged((newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    // トグル
    if (newSet.booleanFunction !== oldSet.booleanFunction) {
      if (newSet.booleanFunction === true)
        provideStyleMain(newSet.booleanFunction as boolean)
      else
        removeProvideStyle(keyStyle)
    }
  })

  logseq.beforeunload(async () => {
    //ポップアップを削除
    parent.document.getElementById(logseq.baseInfo.id + "--" + keyPopup)?.remove()
  })/* end_beforeunload */

}/* end_main */



//ポップアップを表示

const showPopup = () => {
  //ポップアップを表示
  logseq.provideUI({
    attrs: {
      title: "Side Block plugin",
    },
    key: keyPopup,
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
        <p>${t("Select a parent block first, then click the tag name to insert that tag.")} <button class="button" data-on-click="${keyShowSettingsUI}" title="Side Block: ${t("plugin settings")}">⚙️</button></p>
        <hr/>
        <table>
          <tr><th>${t("Size")}</th><th>${t("Tag name")}</th><th>${t("Width")}</th></tr>
          <tr><td>Free</td><td><button class="button" data-on-click="${keyButton00}" title="${t("Click here to insert a tag at the end of the current block.")}">#.side</button></td><td>unset</td></tr>
          <tr><td>S</td><td><button class="button" data-on-click="${keyButton01}" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-s</button></td><td>100px</td></tr>
          <tr><td>M</td><td><button class="button" data-on-click="${keyButton02}" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-m</button></td><td>200px</td></tr>
          <tr><td>L</td><td><button class="button" data-on-click="${keyButton03}" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-l</button></td><td>300px</td></tr>
          <tr><td>LL</td><td><button class="button" data-on-click="${keyButton04}" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-ll</button></td><td>400px</td></tr>
          <tr><td>LLL</td><td><button class="button" data-on-click="${keyButton05}" title="${t("Click here to insert a tag at the end of the current block.")}">#.side-lll</button></td><td>500px</td></tr>
        </table>
        <hr/>
        <p><small>${t("Tags containing \".side\" are displayed only when editing.")}</small></p>
        </div>
        </div>
              `,
  })
}

const eventReplaceAndInsert = async (tag: string) => {

  // if (logseqMdModel === false) {

  // }

  //現在のブロックを取得
  const currentBlock = await logseq.Editor.getCurrentBlock() as BlockEntity | null // TODO: なぜか、DBモデルではnullが返ってくる
  if (currentBlock) {
    let content: string = logseqMdModel === true ?
      currentBlock.content as string //Md モデルの場合
      : currentBlock.title as unknown as string // DB モデルの場合
    //current.contentが空の場合はキャンセル
    if (content === "") {
      logseq.UI.showMsg(t("The current block is empty."), "warning")
      return
    }
    //子ブロックを持たない場合は、子ブロックを追加
    if (currentBlock.children!.length === 0)
      await logseq.Editor.insertBlock(currentBlock.uuid, "")

    const ele = parent.document.querySelector(`div#root>div>main>div#app-container div[blockid="${currentBlock.uuid}"]`) as HTMLDivElement | null
    if (ele) {
      //アウトライン表示
      ele.style.outline = "3px solid var(--ls-border-color)"
      setTimeout(() => ele.style.outline = "unset", 6000) //6秒後にアウトラインを消す
    }
    //現在のブロックの最後にタグを追加
    //tagに空白が含まれていたら、[[ ]]で囲む
    // if (tag.includes(" "))
    //   tag = "[[" + tag + "]]"

    // #.side-s、#.side-m、#.side-lll、#.side-ll、#.side-lを削除する。ただし、#.sideは最後に削除する
    if (content) {
      content = content.replace(/ #\.side-s| #\.side-m| #\.side-lll| #\.side-ll| #\.side-l| #.side/g, "")
    }

    //contentの中に、\nが含まれている場合、一つ目の\nの前に、tagを挿入する
    content = content.includes("\n")
      ? content.replace("\n", " #" + tag + "\n")
      : content + " #" + tag

    //ほかのタグが使われている場合は削除する
    await logseq.Editor.updateBlock(currentBlock.uuid, content as string, currentBlock.properties)
    logseq.UI.showMsg(t("Insert at editing block: #") + tag + ".", "info")
    logseq.Editor.editBlock(currentBlock.uuid)

  } else
    //ブロックが選択されていない場合
    logseq.UI.showMsg(t("No block selected."), "warning")
}

const provideStyleMain = (config: boolean) => {
  if (config === true)
    logseq.provideStyle({ key: keyStyle, style: CSS })
}

logseq.ready(main).catch(console.error)