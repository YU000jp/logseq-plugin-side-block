# Logseq プラグイン: Side Block 🥦

[English](https://github.com/YU000jp/logseq-plugin-side-block) / [日本語](https://github.com/YU000jp/logseq-plugin-side-block/blob/main/readme.ja.md)

- 左右に箇条書きブロックを配置するプラグインです。親ブロックにタグをつけるとその隣に、その子孫ブロックを配置します。
   > 通常、これはカスタムCSSとして適用できますが、使いやすくするためにプラグインとして提供しています。

[![最新リリースバージョン](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-side-block)](https://github.com/YU000jp/logseq-plugin-side-block/releases)
[![ライセンス](https://img.shields.io/github/license/YU000jp/logseq-plugin-side-block?color=blue)](https://github.com/YU000jp/logseq-plugin-side-block/LICENSE)
[![ダウンロード数](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-side-block/total.svg)](https://github.com/YU000jp/logseq-plugin-side-block/releases)
  公開日: 2023年10月15日

## 概要

- 特定のタグを親ブロックに付けると、子ブロックがその隣に配置されます。
> 編集時以外、タグは非表示になります。

![スクリーンショット 2023-10-13 144110](https://github.com/YU000jp/logseq-plugin-side-block/assets/111847207/c85ebc5e-9442-42c0-bac5-1616203483ca)

---

## 始めに

非サポート > 同時に「Bullet Threading」プラグインは使用できません

Logseq マーケットプレイスからインストール
  - 右上のツールバーで[`---`]をクリックして[`プラグイン`]を開きます。`マーケットプレイス`を選択し、検索フィールドに`Side`と入力し、検索結果から選択してインストールします。

### 使用方法

- 親ブロックにタグを付けます。
> `.side`を含むタグは、編集時にのみ表示されます。

以下のいずれかの方法を使用します:

1. ツールバーから
   - ツールバーのボタンから操作します。ボタンをクリックするとポップアップが表示されます。
     > 最初、このボタンはLogseqによって非表示にされています。ツールバーのこのボタン (![アイコン](https://github.com/YU000jp/logseq-plugin-bullet-point-custom-icon/assets/111847207/136f9d0f-9dcf-4942-9821-c9f692fcfc2f)) をクリックし、その後、この (![画像](https://github.com/YU000jp/logseq-plugin-side-block/assets/111847207/726d00da-f665-4eb1-ac15-77e10a24dcae)) を選択します。その後、ツールバーに #️⃣ ボタンが表示されます。
   - ポップアップからブロックに直接タグを挿入します。
1. 直接タグを付ける
   - 親ブロックに特定のタグを追加します。
     - `#.side`: 幅未設定
     - `#.side-s`: 幅 100px
     - `#.side-m`: 幅 200px
     - `#.side-l`: 幅 300px
     - `#.side-ll`: 幅 400px
     - `#.side-lll`: 幅 500px
  > 2回目以降からは、スペースと`#.`を入力すると候補が表示されます。

ショーケース > テンプレートに埋め込んでタグを使用する

#### このプラグインなしで、カスタムCSSとしてインストール

- [CSSコードはこちら](https://github.com/YU000jp/logseq-plugin-side-block/blob/main/src/style.css)（[alexlのコード](https://codeberg.org/alexl/for-logseq)をベースにしています）

---

## ショーケース / 質問 / アイデア / ヘルプ

> [ディスカッション](https://github.com/YU000jp/logseq-plugin-side-block/discussions)タブにアクセスして、この種の質問をするか見つけます。

1. このプラグインは、Logseq の DOM 構造に依存しています。Logseq のバージョン更新により DOM 構造が変更された場合、スタイルが適用されない場合があります。CSSを調整して対応します。何か気づいたら、issueを提起してください。

## 先行技術とクレジット

CSSコード > [@alexl](https://codeberg.org/alexl/for-logseq)

アイコン > [icooon-mono.com](https://icooon-mono.com/00372-%e3%83%96%e3%83%ad%e3%83%83%e3%82%b3%e3%83%aa%e3%83%bc/)

製作者 > [@YU000jp](https://github.com/YU000jp)

<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>