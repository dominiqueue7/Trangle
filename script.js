function replaceUrlParam(url, paramName, paramValue) {
  if (paramValue == null) {
    paramValue = "";
  }
  var pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  url = url.replace(/[?#]$/, "");
  return (
    url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
  );
}

function addLink() {
  var d = document.querySelector("#hdtb-tls");
  for (var key in addLink.LANG) {
    var url = location.href;
    url = replaceUrlParam(url, "lr", "lang_" + key);

    var div = document.createElement("div");
    var a = document.createElement("a");
    var div2 = document.createElement("div");
    div.className = "T7Ko6";
    a.className = "LatpMc nPDzT T3FoJb";
    div2.className = "YmvwI";

    div2.innerText = addLink.LANG[key];
    a.href = url;

    a.append(div2)
    div.append(a);
    console.log(d)
    d.insertAdjacentElement('afterend', div);
  }
}

function init() {
  var func = function () {
    setTimeout("addLink()", 10);
    // setTimeout("sample()", 10);
  };
  func();
  // document.addEventListener('DOMNodeInserted', func, false);
}

chrome.extension.sendRequest(
  {
    method: "getLang",
  },
  function (response) {
    addLink.LANG = response.lang;
    init();
  }
);
