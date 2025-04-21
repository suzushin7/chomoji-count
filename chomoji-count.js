// テキスト文字数カウンターブックマークレット（改行判定修正版）
(function() {
  // すでに実行中かチェック
  if (window._chomojiCountActive) {
    return;
  }
  
  // アクティブフラグの設定
  window._chomojiCountActive = true;
  
  // スタイルの追加
  const style = document.createElement("style");
  style.id = "text-counter-style";
  style.textContent = `
    #text-counter-popup {
      position: fixed;
      bottom: 20px;
      right: 20px;
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
      <tr><td>テキスト:</td><td id="text-only-count">0</td></tr>
      <tr><td>+改行:</td><td id="with-newlines-count">0</td></tr>
      <tr><td>+改行+空白:</td><td id="with-spaces-count">0</td></tr>
    </table>
  `;
  document.body.appendChild(popup);
  
  // HTMLタグを削除する関数
  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  
  // カウント計算関数
  function updateCount() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      // 選択範囲のテキストを取得
      const range = selection.getRangeAt(0);
      const fragment = range.cloneContents();
      const div = document.createElement("div");
      div.appendChild(fragment);
      
      // HTMLタグを除去したテキスト
      const plainText = stripHtml(div.innerHTML);
      
      // 各カウントの計算（修正版）
      const textOnlyCount = plainText.replace(/[\n\r\t\f\v ]/g, "").length; // 全ての空白文字を削除
      const withNewlinesCount = plainText.replace(/[ \t\f\v]/g, "").length; // 改行以外の空白を削除
      const withSpacesCount = plainText.length; // すべて含む
      
      // 結果の表示
      document.getElementById("text-only-count").textContent = textOnlyCount;
      document.getElementById("with-newlines-count").textContent = withNewlinesCount;
      document.getElementById("with-spaces-count").textContent = withSpacesCount;
      
      // ポップアップを表示
      popup.classList.add("active");
    } else {
      // 選択がない場合はポップアップを非表示
      popup.classList.remove("active");
    }
  }
  
  // マウスアップイベントでカウント更新
  document.addEventListener("mouseup", updateCount);
  
  // キーアップイベントでもカウント更新（キーボード選択のため）
  document.addEventListener("keyup", function(e) {
    // 矢印キー、Shift、Ctrl、Home、Endなどの選択に関わるキーのみ対象に
    const selectionKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Shift",
      "Control",
      "Meta",
      "Alt",
    ];
    if (selectionKeys.includes(e.key)) {
      updateCount();
    }
  });
  
  // 初期実行
  updateCount();
})();
