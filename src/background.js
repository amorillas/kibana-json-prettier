"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ columns: "data, message" });
});