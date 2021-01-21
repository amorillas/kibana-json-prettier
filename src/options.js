"use strict";

function constructOptions() {
  chrome.storage.sync.get("columns", function (data) {
    if (data != undefined && data.columns != undefined) {
      document.getElementById("columns").value = data.columns;
    }
  });

  document.getElementById("columns").addEventListener("input", function (event) {
    chrome.storage.sync.set({ column: event.srcElement.value });
  });
}

constructOptions();
