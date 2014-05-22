

$().ready(function () {

    // -------------------------------------------
    //                 Variables:
    // -------------------------------------------

    var background = new ZoomBackground();
    var popup = new ZoomPopup();

    // -------------------------------------------
    //                   Setup:
    // -------------------------------------------

    $("img[data-izin]").addClass("cursor-zoom-in").click(function () {
        zoom_in($(this));
    });

    background.$background.click(function () {
        zoom_out();
    });


    popup.$div.click(function () {
        zoom_out();
    });

    // -------------------------------------------
    //                   Main:
    // -------------------------------------------

    function calcLargeSrc($img) {
        var src = $img.attr("data-izin");
        if (!src) src = $img.attr("src");
        return src;
    }

    function zoom_in($img) {
        background.startShow();
        //
        popup.startShow($img);
        //
        loadImage(popup.$imgLarge, calcLargeSrc($img), function (ok) {
            if (!ok) {
                popup.startShowError();
            } else {
                popup.startShowImage();
            }
        });
    }

    function zoom_out() {
        background.startHide();
        popup.startHide();
    }

}); // $().ready(...
