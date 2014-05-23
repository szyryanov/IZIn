
// returns src property of the <script> tag currently processing by browser (i.e. this script file URL)
// must be callid directly in the script, will not works inside "$(document).ready()"
function calcThisScriptSrc() {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1].src;
}

function calcScriptPathWithTrailingSlash(scriptUrl) {
    return scriptUrl.replace(/[^\/\\]+$/, "");
}

function isDevEnv(url_js) {
    return /izinEnv.js/.test(url_js);
}

function setupEnv() {
    var url_js = calcThisScriptSrc();
    if (isDevEnv(url_js)) {
        izin_env.url_css = "../css/izin.css";
        izin_env.url_image_loading = "../izin-images/image-loading.gif";
    } else {
        var path = calcScriptPathWithTrailingSlash(url_js);
        izin_env.url_css = path + "izin.css";
        izin_env.url_image_loading = path + "image-loading.gif";
    }
}

function izin_env() {
}

setupEnv();