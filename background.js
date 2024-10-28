chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "getLang") {
    chrome.storage.local.get("lang", (result) => {
      sendResponse({ lang: result.lang ? JSON.parse(result.lang) : {} });
      chrome.action.setIcon({
        tabId: sender.tab.id,
        path: {
          "16": "icon-16.png",
          "32": "icon-32.png",
          "48": "icon-48.png",
          "128": "icon-128.png"
        }
      });
    });
    return true; // Will respond asynchronously
  }
});

// Check version and open options page if needed
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.local.get("version");
  if (!result.version || result.version < 20) {
    await chrome.storage.local.set({ version: 20 });
    chrome.runtime.openOptionsPage();
  }
});