# ちょ文字カウント / Chomoji Count

* [日本語](#日本語)
* [English](#english)

---

## 日本語

### 概要

「ちょ文字カウント」は、ウェブページ上で選択したテキストの文字数をリアルタイムでカウントするシンプルなブックマークレットです。テキスト選択後、マウスカーソルの直下にポップアップが表示され、2種類の文字数カウントが表示されます。

### 機能

- テキストを選択するだけで自動的に文字数をカウント
- 以下の2種類のカウントを表示：
  - 文字数：改行を除いた文字数
  - ＋改行：改行を含むすべての文字数
- 選択が解除されると自動的にポップアップが非表示に
- マウスカーソルの直下に表示されるため、見やすい位置でカウントを確認可能

### インストール方法

1. 以下のコードをすべてコピーします：

```javascript
javascript:(function(){if(window._chomojiCountActive)return;window._chomojiCountActive=true;let mouseX=0;let mouseY=0;const style=document.createElement("style");style.id="text-counter-style";style.textContent="#text-counter-popup{position:absolute;background-color:#333;color:white;padding:10px 15px;border-radius:5px;font-family:Arial,sans-serif;font-size:14px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,0.2);display:none}#text-counter-popup.active{display:block}#text-counter-popup table{margin:0;border-collapse:collapse}#text-counter-popup td{padding:3px 8px}#text-counter-popup td:first-child{font-weight:bold;text-align:right}";document.head.appendChild(style);const popup=document.createElement("div");popup.id="text-counter-popup";popup.innerHTML="<table><tr><td>文字数:</td><td id=\"text-only-count\">0</td></tr><tr><td>＋改行:</td><td id=\"with-newlines-count\">0</td></tr></table>";document.body.appendChild(popup);function getSelectedText(){const selection=window.getSelection();if(!selection.rangeCount)return"";const selectedText=selection.toString();return selectedText;}function hidePopup(){popup.classList.remove("active");}function updateCount(){const selection=window.getSelection();if(selection.rangeCount>0&&!selection.isCollapsed){const plainText=getSelectedText();const withoutNewlines=plainText.replace(/[\r\n]+/g,"");const textOnlyCount=withoutNewlines.length;const withNewlinesCount=plainText.length;document.getElementById("text-only-count").textContent=textOnlyCount;document.getElementById("with-newlines-count").textContent=withNewlinesCount;popup.style.left=mouseX+"px";popup.style.top=(mouseY+10)+"px";popup.classList.add("active");}else{hidePopup();}}document.addEventListener("mousemove",function(e){mouseX=e.pageX;mouseY=e.pageY;});document.addEventListener("mouseup",function(e){mouseX=e.pageX;mouseY=e.pageY;setTimeout(updateCount,10);});document.addEventListener("selectionchange",function(){updateCount();});updateCount();})();
```

2. ブラウザのブックマークバーを表示します（Chromeの場合は `Ctrl+Shift+B` または `⌘+Shift+B`）
3. ブックマークバーの空いている場所を右クリックし、「ページの追加」または「新しいブックマーク」を選択します
4. 名前に「ちょ文字カウント」と入力します
5. URLの欄に、先ほどコピーしたコードを貼り付けます
6. 「保存」をクリックします

### 使用方法

1. 文字数をカウントしたいウェブページで、ブックマークバーから「ちょ文字カウント」をクリックします
2. ページ上のテキストを選択します
3. マウスカーソルの直下にポップアップが表示され、テキストの文字数が表示されます
4. 別のテキストを選択すると、カウントが自動的に更新されます
5. 選択を解除すると、ポップアップは自動的に非表示になります

### 注意事項

- 一部のウェブサイトでは、セキュリティ設定によりブックマークレットが機能しない場合があります
- ページを更新すると、ブックマークレットは無効になります（再度クリックする必要があります）

---

## English

### Overview

"Chomoji Count" is a simple bookmarklet that counts the number of characters in selected text on web pages in real-time. After selecting text, a popup appears below the mouse cursor displaying two different character counts.

### Features

- Automatically counts characters as soon as text is selected
- Displays two types of counts:
  - Character count: Number of characters excluding line breaks
  - +Line breaks: Total number of characters including line breaks
- Popup automatically hides when text selection is cleared
- Appears below the mouse cursor for easy viewing

### Installation

1. Copy all of the following code:

```javascript
javascript:(function(){if(window._chomojiCountActive)return;window._chomojiCountActive=true;let mouseX=0;let mouseY=0;const style=document.createElement("style");style.id="text-counter-style";style.textContent="#text-counter-popup{position:absolute;background-color:#333;color:white;padding:10px 15px;border-radius:5px;font-family:Arial,sans-serif;font-size:14px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,0.2);display:none}#text-counter-popup.active{display:block}#text-counter-popup table{margin:0;border-collapse:collapse}#text-counter-popup td{padding:3px 8px}#text-counter-popup td:first-child{font-weight:bold;text-align:right}";document.head.appendChild(style);const popup=document.createElement("div");popup.id="text-counter-popup";popup.innerHTML="<table><tr><td>文字数:</td><td id=\"text-only-count\">0</td></tr><tr><td>＋改行:</td><td id=\"with-newlines-count\">0</td></tr></table>";document.body.appendChild(popup);function getSelectedText(){const selection=window.getSelection();if(!selection.rangeCount)return"";const selectedText=selection.toString();return selectedText;}function hidePopup(){popup.classList.remove("active");}function updateCount(){const selection=window.getSelection();if(selection.rangeCount>0&&!selection.isCollapsed){const plainText=getSelectedText();const withoutNewlines=plainText.replace(/[\r\n]+/g,"");const textOnlyCount=withoutNewlines.length;const withNewlinesCount=plainText.length;document.getElementById("text-only-count").textContent=textOnlyCount;document.getElementById("with-newlines-count").textContent=withNewlinesCount;popup.style.left=mouseX+"px";popup.style.top=(mouseY+10)+"px";popup.classList.add("active");}else{hidePopup();}}document.addEventListener("mousemove",function(e){mouseX=e.pageX;mouseY=e.pageY;});document.addEventListener("mouseup",function(e){mouseX=e.pageX;mouseY=e.pageY;setTimeout(updateCount,10);});document.addEventListener("selectionchange",function(){updateCount();});updateCount();})();
```

2. Display your browser's bookmark bar (in Chrome, press `Ctrl+Shift+B` or `⌘+Shift+B`)
3. Right-click on an empty area of the bookmark bar and select "Add page" or "New bookmark"
4. Enter "Chomoji Count" as the name
5. Paste the copied code into the URL field
6. Click "Save"

### Usage

1. On the web page where you want to count characters, click on "Chomoji Count" in your bookmark bar
2. Select text on the page
3. A popup will appear below your mouse cursor displaying the character counts
4. When you select different text, the counts will automatically update
5. When you clear the selection, the popup will automatically hide

### Notes

- The bookmarklet may not function on some websites due to security settings
- If you refresh the page, the bookmarklet will be deactivated (you'll need to click it again)
