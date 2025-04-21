# ちょ文字カウント / Chomoji Count

* [日本語](#日本語)
* [English](#english)

---

## 日本語

### 概要

「ちょ文字カウント」は、ウェブページ上で選択したテキストの文字数をリアルタイムでカウントするシンプルなブックマークレットです。テキスト選択後、画面右下にポップアップが表示され、3種類の文字数カウントが表示されます。

### 機能

- テキストを選択するだけで自動的に文字数をカウント
- 以下の3種類のカウントを表示：
  - テキスト：スペースや改行を除いた純粋な文字数
  - +改行：改行を含むが、スペースを除いた文字数
  - +改行+空白：すべての文字、改行、スペースを含む総文字数
- HTMLタグは自動的に除去されるため、ウェブページ上のどのようなコンテンツでも正確にカウント可能
- 一度アクティブにすると、その後のテキスト選択時に自動的にカウント表示

### インストール方法

1. 以下のコードをすべてコピーします：

```javascript
javascript:(function(){if(window._chomojiCountActive)return;window._chomojiCountActive=true;const style=document.createElement("style");style.id="text-counter-style";style.textContent="#text-counter-popup{position:fixed;bottom:20px;right:20px;background-color:#333;color:white;padding:10px 15px;border-radius:5px;font-family:Arial,sans-serif;font-size:14px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,0.2);display:none}#text-counter-popup.active{display:block}#text-counter-popup table{margin:0;border-collapse:collapse}#text-counter-popup td{padding:3px 8px}#text-counter-popup td:first-child{font-weight:bold;text-align:right}";document.head.appendChild(style);const popup=document.createElement("div");popup.id="text-counter-popup";popup.innerHTML="<table><tr><td>テキスト:</td><td id=\"text-only-count\">0</td></tr><tr><td>+改行:</td><td id=\"with-newlines-count\">0</td></tr><tr><td>+改行+空白:</td><td id=\"with-spaces-count\">0</td></tr></table>";document.body.appendChild(popup);function stripHtml(html){const tmp=document.createElement("div");tmp.innerHTML=html;return tmp.textContent||tmp.innerText||"";}function updateCount(){const selection=window.getSelection();if(selection.rangeCount>0){const range=selection.getRangeAt(0);const fragment=range.cloneContents();const div=document.createElement("div");div.appendChild(fragment);const plainText=stripHtml(div.innerHTML);const textOnlyCount=plainText.replace(/[\n\r\s]/g,"").length;const withNewlinesCount=plainText.replace(/[\s]/g,"").length;const withSpacesCount=plainText.length;document.getElementById("text-only-count").textContent=textOnlyCount;document.getElementById("with-newlines-count").textContent=withNewlinesCount;document.getElementById("with-spaces-count").textContent=withSpacesCount;popup.classList.add("active");}else{popup.classList.remove("active");}}document.addEventListener("mouseup",updateCount);document.addEventListener("keyup",function(e){const selectionKeys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End","PageUp","PageDown","Shift","Control","Meta","Alt"];if(selectionKeys.includes(e.key)){updateCount();}});updateCount();})();
```

2. ブラウザのブックマークバーを表示します（Chromeの場合は `Ctrl+Shift+B` または `⌘+Shift+B`）
3. ブックマークバーの空いている場所を右クリックし、「ページの追加」または「新しいブックマーク」を選択します
4. 名前に「ちょ文字カウント」と入力します
5. URLの欄に、先ほどコピーしたコードを貼り付けます
6. 「保存」をクリックします

### 使用方法

1. 文字数をカウントしたいウェブページで、ブックマークバーから「ちょ文字カウント」をクリックします
2. ページ上のテキストを選択します
3. 画面右下にポップアップが表示され、テキストの文字数が表示されます
4. 別のテキストを選択すると、カウントが自動的に更新されます

### 注意事項

- 一部のウェブサイトでは、セキュリティ設定によりブックマークレットが機能しない場合があります
- ページを更新すると、ブックマークレットは無効になります（再度クリックする必要があります）

---

## English

### Overview

"Chomoji Count" is a simple bookmarklet that counts the number of characters in selected text on web pages in real-time. After selecting text, a popup appears in the bottom right corner of the screen displaying three different character counts.

### Features

- Automatically counts characters as soon as text is selected
- Displays three types of counts:
  - Text only: Pure character count excluding spaces and line breaks
  - +Line breaks: Character count including line breaks but excluding spaces
  - +Line breaks+Spaces: Total count including all characters, line breaks, and spaces
- HTML tags are automatically removed, ensuring accurate counts for any content on web pages
- Once activated, it automatically displays counts for subsequent text selections

### Installation

1. Copy all of the following code:

```javascript
javascript:(function(){if(window._chomojiCountActive)return;window._chomojiCountActive=true;const style=document.createElement("style");style.id="text-counter-style";style.textContent="#text-counter-popup{position:fixed;bottom:20px;right:20px;background-color:#333;color:white;padding:10px 15px;border-radius:5px;font-family:Arial,sans-serif;font-size:14px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,0.2);display:none}#text-counter-popup.active{display:block}#text-counter-popup table{margin:0;border-collapse:collapse}#text-counter-popup td{padding:3px 8px}#text-counter-popup td:first-child{font-weight:bold;text-align:right}";document.head.appendChild(style);const popup=document.createElement("div");popup.id="text-counter-popup";popup.innerHTML="<table><tr><td>テキスト:</td><td id=\"text-only-count\">0</td></tr><tr><td>+改行:</td><td id=\"with-newlines-count\">0</td></tr><tr><td>+改行+空白:</td><td id=\"with-spaces-count\">0</td></tr></table>";document.body.appendChild(popup);function stripHtml(html){const tmp=document.createElement("div");tmp.innerHTML=html;return tmp.textContent||tmp.innerText||"";}function updateCount(){const selection=window.getSelection();if(selection.rangeCount>0){const range=selection.getRangeAt(0);const fragment=range.cloneContents();const div=document.createElement("div");div.appendChild(fragment);const plainText=stripHtml(div.innerHTML);const textOnlyCount=plainText.replace(/[\n\r\s]/g,"").length;const withNewlinesCount=plainText.replace(/[\s]/g,"").length;const withSpacesCount=plainText.length;document.getElementById("text-only-count").textContent=textOnlyCount;document.getElementById("with-newlines-count").textContent=withNewlinesCount;document.getElementById("with-spaces-count").textContent=withSpacesCount;popup.classList.add("active");}else{popup.classList.remove("active");}}document.addEventListener("mouseup",updateCount);document.addEventListener("keyup",function(e){const selectionKeys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End","PageUp","PageDown","Shift","Control","Meta","Alt"];if(selectionKeys.includes(e.key)){updateCount();}});updateCount();})();
```

2. Display your browser's bookmark bar (in Chrome, press `Ctrl+Shift+B` or `⌘+Shift+B`)
3. Right-click on an empty area of the bookmark bar and select "Add page" or "New bookmark"
4. Enter "Chomoji Count" as the name
5. Paste the copied code into the URL field
6. Click "Save"

### Usage

1. On the web page where you want to count characters, click on "Chomoji Count" in your bookmark bar
2. Select text on the page
3. A popup will appear in the bottom right corner displaying the character counts
4. When you select different text, the counts will automatically update

### Notes

- The bookmarklet may not function on some websites due to security settings
- If you refresh the page, the bookmarklet will be deactivated (you'll need to click it again)
