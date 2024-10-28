// Saves options to chrome.storage
function saveOptions() {
  const lr = document.getElementsByName("lr");
  const lang = {};
  
  for (const l of lr) {
    if (l.checked) {
      lang[l.id] = document.getElementById("t" + l.id).innerText;
    }
  }
  
  chrome.storage.local.set(
    { lang: JSON.stringify(lang) },
    () => {
      // Update status to let user know options were saved
      const status = document.getElementById("status");
      status.innerHTML = "Options Saved.";
      setTimeout(() => {
        status.innerHTML = "";
      }, 750);
    }
  );
}

// Restores select box state to saved value from chrome.storage
function restoreOptions() {
  chrome.storage.local.get("lang", (result) => {
    if (!result.lang) return;
    
    const lang = JSON.parse(result.lang);
    const lr = document.getElementsByName("lr");
    
    for (const l of lr) {
      if (l.id in lang) {
        l.checked = true;
      }
    }
  });
}

// Set button action
document.addEventListener("DOMContentLoaded", () => {
  restoreOptions();
  document.getElementById("save").addEventListener("click", () => {
    saveOptions();
    window.close();
  });
});