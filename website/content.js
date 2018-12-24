function escapeRegExp(string) {
    return string.replace(/[\.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSelectedTextObject(){
    return window.getSelection()
}

function getSelectedText(){
    return getSelectedTextObject().toString();
}
function getSelectedTextParentElement(){
    if(getSelectedText()) return getSelectedTextObject().anchorNode.parentNode
}

function highlight(parent, selectedtext){
    $(parent).html(function(index,html){
        var p = escapeRegExp(selectedtext);
        var regex = new RegExp(p, "");
        var k = html.replace(regex, `<mark style="background-color:yellow">${selectedtext}</mark>`);
        return k;
    });
}

function highlighterValidator(parent, content){
    if (content && content.length > 0){
        return true
    }else{
        return false
    }
}

function highlighterCaller(){
    let parent = getSelectedTextParentElement()
    let content = getSelectedText()
    if(highlighterValidator(parent, content))
        highlight(parent, getSelectedText())
}

function highlighterButtonPressed(event){
    console.log("presed")
    highlighterCaller();
    highlighterButtonHide();
}

function unselectSelectedText(){
    return window.getSelection().removeAllRanges();
}
function highlighterButtonHide(){
    $("#customhighlightbutton").css("display", "none");
}

function positionbutton(){
    let hightlightImgUrl = chrome.runtime.getURL("website/highlighter.png")
    $('body').append(`<img id="customhighlightbutton" class="customhighlightbutton" />`);
    $("#customhighlightbutton").attr("src", hightlightImgUrl);
    
    $(document).ready(function () {
        $('body').bind("mouseup", function(event){
            text = getSelectedText();
            if(text && text.length > 0){
                let x = event.pageX-13;
                let y = event.pageY-30;
                $("#customhighlightbutton").css("left", x);
                $("#customhighlightbutton").css("top", y);
                $("#customhighlightbutton").css("display", "block");
            }
        })

        // $('body:not(img#customhighlightbutton)').bind("mousedown", function(){
        //     console.log("down")
        //     // setTimeout(function(){
        //         //     console.log("df")
        //         unselectSelectedText();
        //         highlighterButtonHide();
        //         // },1)
        //     })
        $("body img#customhighlightbutton").bind("click",highlighterButtonPressed)
        
    })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        highlighterCaller();
        sendResponse();
});
positionbutton()