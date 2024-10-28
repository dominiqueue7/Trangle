// Saves options to localStorage.
function save_options() {
  var lr = document.getElementsByName("lr");
  var lang = {};
  for (var i = 0; i < lr.length; i++) {
    var l = lr[i];
    if (l.checked) {
      // lang[l.id] =
      //   "Search " + document.getElementById("t" + l.id).innerText + " pages";
      lang[l.id] = document.getElementById("t" + l.id).innerText;
    }
  }
  localStorage["lang"] = JSON.stringify(lang);

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function () {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var lang = JSON.parse(localStorage.getItem("lang"));
  if (!lang) {
    return;
  }
  var lr = document.getElementsByName("lr");
  for (var i = 0; i < lr.length; i++) {
    var l = lr[i];
    if (l.id in lang) {
      l.checked = true;
    }
  }
}

// set button action
$(document).ready(function () {
  restore_options();
  $("#save").click(function () {
    save_options();
    window.close();
  });
});
