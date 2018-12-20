// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function copybuttoncode(randomNum){ 
    let cssCode = ".customhighlightbutton".concat(randomNum).concat("{position: relative;padding: 5px 10px;border-radius: 5%;background-color: red;color: white;}")  
    chrome.tabs.insertCSS({
      code: cssCode
    })
    console.log("sdfsdf")
}

function genericOnClick(info, tab) {
  console.log(info);
  console.log(tab);
  var selectedtext = escapeRegExp(info.selectionText);
  var randomNum = Math.random()
  var coded = `$('body').html(function(index,html){
    var p = "`.concat(selectedtext).concat(`";
    console.log("`).concat(selectedtext).concat(`")
    var regex = new RegExp(p, "");
    var k = html.replace(regex, '<mark class="customhighlightbutton`).concat(randomNum).concat(`" style="background-color:yellow">'+p+'</mark>');
    return k;
  }); `)

  
  chrome.tabs.executeScript({
    file: 'jquery.js'
    
  });
  copybuttoncode(randomNum)

  var mouseupcode = `
  $('body').mouseup(function(event){
    var x = event.clientX;
    var y = event.clientY; 
    $(".customhighlightbutton${randomNum}").css("right", x);
    $(".customhighlightbutton${randomNum}").css("top", y);
  })
  `
  console.log(mouseupcode)

  chrome.tabs.executeScript({
    code: mouseupcode
  });
  chrome.tabs.executeScript({
    code: coded
  });
  
}

var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
  "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}
  