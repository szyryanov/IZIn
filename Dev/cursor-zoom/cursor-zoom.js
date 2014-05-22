
// put everything into a local scope:
(function () {
    "use strict";

    var CLASS_CURSOR_ZOOM_IN = "cursor-zoom-in";   // CSS class to add the zoom-in cursor
    var CLASS_CURSOR_ZOOM_OUT = "cursor-zoom-out"; // CSS class to add the zoom-out cursor

    var url_script = calcScriptSrc(); // this script URL, e.g. "http://localhost:18071/lib/cursor-zoom/cursor-zoom.js"
    var url_dir = calcDirUrl(url_script); // script directory URL, e.g. "http://localhost:18071/lib/cursor-zoom/"

    // the style code:
    var cssCode = 
        "." + CLASS_CURSOR_ZOOM_IN + " { " +
            "cursor: url(" + url_dir + "zoom-in.cur), pointer;" +
            "cursor: zoom-in;" +
            "cursor: -moz-zoom-in;" +
            "cursor: -webkit-zoom-in;" +
        "}" +
        "." + CLASS_CURSOR_ZOOM_OUT + " {" +
            "cursor: url(" + url_dir + "zoom-out.cur), pointer;" +
            "cursor: zoom-out;" +
            "cursor: -moz-zoom-out;" +
            "cursor: -webkit-zoom-out;" +
        "}" 
    ;

    addCss(cssCode);

    // ----------------------------------------------------------
    //                      functions:
    // ----------------------------------------------------------

    // returns src property of the <script> tag currently processing by browser (i.e. this script file URL)
    // must be callid directly in the script, will not works inside "$(document).ready()"
    function calcScriptSrc() {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1].src;
    }

    // returns directory URL (including the trailing slash) for the given file URL
    function calcDirUrl(scriptUrl) {
        var p = scriptUrl.lastIndexOf('/');
        return scriptUrl.substr(0, p + 1);
    }

    // adds the css code to a new <style> tag to the page <head>
    // http://yuiblog.com/blog/2007/06/07/style/
    function addCss(cssCode) {
        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode;
        } else {
            styleElement.appendChild(document.createTextNode(cssCode));
        }
        document.getElementsByTagName("head")[0].appendChild(styleElement);
    }

})(); // end of local scope