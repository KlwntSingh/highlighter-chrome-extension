// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function escapeRegExp(string) {
  return string.replace(/[\.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function genericOnClick(info, tab) {
  var selectedtext = info.selectionText;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id,{content: selectedtext}, function(response) {
  });});

}

var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "highlighter";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
  "onclick": genericOnClick});
}
  