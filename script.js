function replaceUrlParam(url, paramName, paramValue) {
  if (paramValue == null) {
    paramValue = "";
  }
  const pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  url = url.replace(/[?#]$/, "");
  return (
    url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
  );
}

function addLink(LANG) {
  const toolsMenu = document.querySelector("#hdtb-tls");
  if (!toolsMenu) return;

  for (const key in LANG) {
    const url = replaceUrlParam(location.href, "lr", "lang_" + key);

    const div = document.createElement("div");
    const a = document.createElement("a");
    const div2 = document.createElement("div");
    
    div.className = "T7Ko6";
    a.className = "LatpMc nPDzT T3FoJb";
    div2.className = "YmvwI";

    div2.innerText = LANG[key];
    a.href = url;

    a.append(div2);
    div.append(a);
    toolsMenu.insertAdjacentElement('afterend', div);
  }
}

function init(LANG) {
  // Wait for the tools menu to be available
  const observer = new MutationObserver((mutations, obs) => {
    const toolsMenu = document.querySelector("#hdtb-tls");
    if (toolsMenu) {
      addLink(LANG);
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Get language settings and initialize
chrome.runtime.sendMessage(
  { method: "getLang" },
  (response) => {
    if (response && response.lang) {
      init(response.lang);
    }
  }
);