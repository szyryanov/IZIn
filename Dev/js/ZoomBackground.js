
function ZoomBackground() {
    var html = '<div class="img-zoom-background cursor-zoom-out"></div>';
    //
    this.$background = $(html);
    $("body").append(this.$background);
    //
    this.$background.fadeOut(0);
}

ZoomBackground.prototype.startShow = function () {
    this.$background.fadeIn();
};

ZoomBackground.prototype.startHide = function () {
    this.$background.fadeOut();
};

