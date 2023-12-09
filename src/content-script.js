try {

  const injectDOMElement = (tagName, targetElement, options = {}) => {
    const element = document.createElement(tagName);
    Object.entries(options).forEach(([optionKey, optionValue]) => {
      element[optionKey] = optionValue;
    });
    targetElement.appendChild(element);
    return element;
  };

  // 1. 建立 appContainer (div) 放進 body
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  // 2. 建立 <app-root> 放進 appContainer
  const appElement = document.createElement("app-root");
  appContainer.appendChild(appElement);

  // 3. 將擴充套件的 js 和 css 掛在被擴充的網站上
  ["styles.css", "runtime.js", "polyfills.js", "main.js"].forEach((file) => {
    if (file.endsWith(".css")) {
      injectDOMElement("link", document.head, {
        rel: "stylesheet",
        href: chrome.runtime.getURL(file),
      });
    } else {
      injectDOMElement("script", document.head, {
        src: chrome.runtime.getURL(file),
        defer: true,
      });
    }
  });
  
} catch (error) {
  console.log("error", error);
}

// 戳一下
chrome.runtime.sendMessage({command: "wake up!"});