const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function (event) {
  console.log("Connected to WebSocket server.");
};

socket.onmessage = function (event) {
  if (event.data === "reload") {
    console.log("Reloading extension......");
    // 重新加載擴展
    chrome.runtime.reload();
  }
};

socket.onerror = function (error) {
  console.log("WebSocket error: " + error.message);
};

// 監聽擴展安裝事件
chrome.runtime.onInstalled.addListener(function() {
  // 刷新所有 tab 頁面 (活動中)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      tabs.forEach(function(tab) {
          chrome.tabs.reload(tab.id);
      });
  });
});