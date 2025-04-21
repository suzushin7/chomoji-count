(function() {
  // すでに実行中かチェック
  if (window._chomojiCountActive) {
    return;
  }
  
  // アクティブフラグの設定
  window._chomojiCountActive = true;
  
  // マウス位置を追跡する変数
  let mouseX = 0;
  let mouseY = 0;
  
  // スタイルの追加
  const style = document.createElement("style");
  style.id = "text-counter-style";
  style.textContent = `
    #text-counter-popup {
      position: absolute;
      background-color: #333;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 9999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: none;
    }
    #text-counter-popup.active {
      display: block;
    }
    #text-counter-popup table {
      margin: 0;
      border-collapse: collapse;
    }
    #text-counter-popup td {
      padding: 3px 8px;
    }
    #text-counter-popup td:first-child {
      font-weight: bold;
      text-align: right;
    }
  `;
  document.head.appendChild(style);
  
  // ポップアップ要素の作成
  const popup = document.createElement("div");
  popup.id = "text-counter-popup";
  popup.innerHTML = `
    <table>
      <tr><td>文字数:</td><td id="text-only-count">0</td></tr>
      <tr><td>＋改行:</td><td id="with-newlines-count">0</td></tr>
    </table>
  `;
  document.body.appendChild(popup);
  
  // HTMLタグを削除し、改行を保持する関数
  function getSelectedText() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return "";
    
    // 選択範囲を直接テキストとして取得
    const selectedText = selection.toString();
    return selectedText;
  }
  
  // ポップアップを非表示にする関数
  function hidePopup() {
    popup.classList.remove("active");
  }
  
  // カウント計算関数
  function updateCount() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      // 選択テキストを取得（改行を保持）
      const plainText = getSelectedText();
      
      // 「文字数」のカウント - 改行のみを取り除く
      const withoutNewlines = plainText.replace(/[\r\n]+/g, "");
      const textOnlyCount = withoutNewlines.length;
      
      // 「＋改行」のカウント - すべての文字を含む
      const withNewlinesCount = plainText.length;
      
      // 結果の表示
      document.getElementById("text-only-count").textContent = textOnlyCount;
      document.getElementById("with-newlines-count").textContent = withNewlinesCount;
      
      // マウス位置の直下にポップアップを表示
      popup.style.left = mouseX + "px";
      popup.style.top = (mouseY + 10) + "px";
      
      // ポップアップを表示
      popup.classList.add("active");
    } else {
      // 選択がない/キャンセルされた場合は即座に非表示に
      hidePopup();
    }
  }
  
  // マウス移動イベントでマウス位置を更新
  document.addEventListener("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
  
  // マウスアップイベントでカウント更新
  document.addEventListener("mouseup", function(e) {
    // マウス位置を更新してからカウント更新
    mouseX = e.pageX;
    mouseY = e.pageY;
    
    // 少し遅延させてカウント更新（選択完了を待つため）
    setTimeout(updateCount, 10);
  });
  
  // 選択変更イベントでもカウント更新
  document.addEventListener("selectionchange", function() {
    updateCount();
  });
  
  // 初期実行
  updateCount();
})();
