(function() {
  if (window._chomojiCountActive) {
    return;
  }
  
  window._chomojiCountActive = true;
  
  let mouseX = 0;
  let mouseY = 0;
  
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
  
  const popup = document.createElement("div");
  popup.id = "text-counter-popup";
  popup.innerHTML = `
    <table>
      <tr><td>Characters:</td><td id="text-only-count">0</td></tr>
      <tr><td>+ Line Breaks:</td><td id="with-newlines-count">0</td></tr>
    </table>
  `;
  document.body.appendChild(popup);
  
  function countChars(str) {
    if (typeof Intl !== 'undefined' && typeof Intl.Segmenter !== 'undefined') {
      try {
        const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
        const segments = segmenter.segment(str);
        return [...segments].length;
      } catch (e) {
        console.log("Segmenter Error:", e);
      }
    }
    
    return Array.from(str).length;
  }
  
  function getSelectedText() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return "";
    
    const selectedText = selection.toString();
    return selectedText;
  }
  
  function hidePopup() {
    popup.classList.remove("active");
  }
  
  function updateCount() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      const plainText = getSelectedText();
      
      const withoutNewlines = plainText.replace(/[\r\n]+/g, "");
      const textOnlyCount = countChars(withoutNewlines);
      
      const withNewlinesCount = countChars(plainText);
      
      document.getElementById("text-only-count").textContent = textOnlyCount;
      document.getElementById("with-newlines-count").textContent = withNewlinesCount;
      
      popup.style.left = mouseX + "px";
      popup.style.top = (mouseY + 10) + "px";
      
      popup.classList.add("active");
    } else {
      hidePopup();
    }
  }
  
  document.addEventListener("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
  
  document.addEventListener("mouseup", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    
    setTimeout(updateCount, 10);
  });
  
  document.addEventListener("selectionchange", function() {
    updateCount();
  });
  
  updateCount();
})();
