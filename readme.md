# Logseq Plugin: Side Block 🥦

- Places bullet blocks on the left and right. If tag parent blocks, its descendant blocks are placed next to it.
> Normally, it can be applied as custom CSS, but we have made it a plugin to make it easier to use.

> [!NOTE]
This plugin works in Logseq db version.

<div align="right">
 
[English](https://github.com/YU000jp/logseq-plugin-side-block) / [日本語](https://github.com/YU000jp/logseq-plugin-side-block/blob/main/readme.ja.md) [![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-side-block)](https://github.com/YU000jp/logseq-plugin-side-block/releases) [![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-side-block?color=blue)](https://github.com/YU000jp/logseq-plugin-side-block/LICENSE) [![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-side-block/total.svg)](https://github.com/YU000jp/logseq-plugin-side-block/releases)
 Published 20231015 <a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
 </div>

## Overview

- If attach a specific tag to a parent block, child blocks will be placed next to it.
> The tags are hidden except when editing.

![スクリーンショット 2023-10-13 144110](https://github.com/YU000jp/logseq-plugin-side-block/assets/111847207/c85ebc5e-9442-42c0-bac5-1616203483ca)

---

## Getting Started

Not supported > `Bullet Threading` plugin cannot be used at the same time

Install from Logseq Marketplace
  - Press [`---`] on the top right toolbar to open [`Plugins`]. Select `marketplace`. Type `Side` in the search field, select it from the search results and install.

### Usage

- Tag the parent block.
  > Tags containing `.side` are displayed only when editing.

Either of the following methods:

1. From toolbar
   - Operate from the toolbar button. When the button click, a popup show.
     > First, the button is hidden by Logseq. Click this button (![icon](https://github.com/YU000jp/logseq-plugin-bullet-point-custom-icon/assets/111847207/136f9d0f-9dcf-4942-9821-c9f692fcfc2f)) on the toolbar. And select this (![image](https://github.com/YU000jp/logseq-plugin-side-block/assets/111847207/726d00da-f665-4eb1-ac15-77e10a24dcae)). After that, the #️⃣ button will appear on the toolbar.
   - Insert tags directly into the block from the popup.
1. Tag directly
   - Add a specific tag to the parent block.
     - `#.side`: width unset
     - `#.side-s`: width 100px
     - `#.side-m`: width 200px
     - `#.side-l`: width 300px
     - `#.side-ll`: width 400px
     - `#.side-lll`: width 500px
  > From the second time onwards, Type a space and `#.`, suggestions will be displayed.

---

## Showcase / Questions / Ideas / Help

> Go to the [Discussions](https://github.com/YU000jp/logseq-plugin-side-block/discussions) tab to ask and find this kind of things.

1. Showcase > Use it by embedding it in a template.
1. Note: When the plugin is not used, such as on mobile versions, the dedicated CSS is not applied. Please add it manually to custom.css. Or if install as custom CSS without this plugin
    > [CSS code](https://github.com/YU000jp/logseq-plugin-side-block/blob/main/src/style.css)
1. This plugin relies on Logseq's DOM (Document Object Model) structure. If the DOM structure changes due to a Logseq version update, styles may not be applied. We will adjust the CSS to deal with it. If you notice something, please raise an issue.
1. Similar functionality is implemented in another plugin too.
   - [Missing Commands & Views plugin](https://github.com/stdword/logseq13-missing-commands?tab=readme-ov-file#7-views) Tablerview
     > If you wish to migrate, please change the page names of the tags used in this plugin.

## Prior art & Credit

- CSS code > [@alexl](https://codeberg.org/alexl/for-logseq)
- Icon > [icooon-mono.com](https://icooon-mono.com/00372-%e3%83%96%e3%83%ad%e3%83%83%e3%82%b3%e3%83%aa%e3%83%bc/)
- Author > [@YU000jp](https://github.com/YU000jp)
