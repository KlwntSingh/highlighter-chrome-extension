function escapeRegExp(string) {
    return string.replace(/[\.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSelectedText(){
    return window.getSelection().toString();
}

function highlight(selectedtext){
    $('body').html(function(index,html){
        var p = escapeRegExp(selectedtext);
        var regex = new RegExp(p, "");
        var k = html.replace(regex, `<mark style="background-color:yellow">${selectedtext}</mark>`);
        console.log(k)
        return k;
    });
}

function highlighterCaller(){
    console.log("asdfsdaf")
    highlight(getSelectedText())
}
function highlighterButtonPressed(event){
    event.preventDefault()
    highlighterCaller()
    highlighterButtonHide();
}

function highlighterButtonHide(){
    $("#customhighlightbutton").css("display", "none");
}

function positionbutton(){
    let hightlightImgUrl = chrome.runtime.getURL("website/highlighter.png")
    $('body').append(`<div id="customhighlightbutton" class="customhighlightbutton" alt="asdf"></div>`);

    $(document).ready(function () {
        $("div#customhighlightbutton").on("click",highlighterButtonPressed)
        $('body:not(div#customhighlightbutton)').on("mouseup", function(event){
            event.preventDefault()
            text = getSelectedText();
            if(text && text.length > 0){
                let x = event.pageX-13;
                let y = event.pageY-50;
                $("#customhighlightbutton").css("left", x);
                $("#customhighlightbutton").css("top", y);
                $("#customhighlightbutton").css("display", "block");
            }
        })
        // $('body:not(#customhighlightbutton)').mousedown(function(){
            //     console.log("down")
            //     window.getSelection().removeAllRanges();
            //     highlighterButtonHide()
        // })
    })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        highlight(request.content);
        sendResponse();
});
//positionbutton()