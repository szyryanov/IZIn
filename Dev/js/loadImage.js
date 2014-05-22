
function loadImage($imgElement, src, callback) {
    //
    if (src) {
        //$element.attr("src", "");
        $imgElement.attr("src", src);
    }
    //
    //
    if (!loadImage.failedSrcs) {
        loadImage.failedSrcs = {};
    } else {
        if (loadImage.failedSrcs[src]) {
            callCallback(false, "error");
            return;
        }
    }
    //
    function callCallback(ok, status) {
        setTimeout(function () { callback(ok, status); }, 10);
    }
    //

    function unbind() {
        $imgElement.off("load.img-zoom");
        $imgElement.off("error.img-zoom");
    }
    //
    //
    var img = $imgElement[0];

    //function waitLoadComplete() {
    //    if (img.complete) {
    //        callCallback(true, "loaded:" + img.complete);
    //    } else {
    //        setTimeout(waitLoadComplete, 50);
    //    }
    //}

    if (img.complete) {
        callCallback(true, "complete");
    } else {
        $imgElement.on("load.img-zoom", function () {
            unbind();
            callCallback(true, "loaded");
            //waitLoadComplete();
        });
        $imgElement.on("error.img-zoom", function () {
            unbind();
            loadImage.failedSrcs[src] = true;
            callCallback(false, "error");
        });
    }
}

