
// calculate the URLs:
//
var url_js = calcThisScriptSrc();
var url_css = url_js.replace(".js", ".css"); //.replace(".min.css", ".css");
//
// add css:
//
addStyleSheet(url_css);

// returns src property of the <script> tag currently processing by browser (i.e. this script file URL)
// must be callid directly in the script, will not works inside "$(document).ready()"
function calcThisScriptSrc() {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1].src;
}

// add the url_css file to the page
function addStyleSheet(url_css) {
    $("head").append('<link rel="stylesheet" href="' + url_css + '" />');
}

