chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (localStorage.getItem("version") < 20) {
        localStorage.setItem("version", 20);
        window.open("options.html");
    }
    if (request.method == "getLang") {
        sendResponse({lang: JSON.parse(localStorage.getItem("lang"))});
        chrome.pageAction.show(sender.tab.id);
    }
    else
        sendResponse({});
});
