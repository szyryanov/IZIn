
//
// add css:
//
addStyleSheet(izin_env.url_css); //url_css);


// add the url_css file to the page
function addStyleSheet(url_css) {
    $("head").append('<link rel="stylesheet" href="' + url_css + '" />');
}

